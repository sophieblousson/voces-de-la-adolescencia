-- 0001_init.sql
-- Voces de la Adolescencia 2026 — tablas base del MVP.
-- Corre en el editor SQL de Supabase o vía `supabase db push`.

-- ---------------------------------------------------------------------
-- Extensión necesaria para gen_random_uuid()
-- ---------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Tabla profiles
-- Un perfil por usuario de auth.users. Roles: admin (activo en el MVP)
-- y jurado (contemplado en el constraint, se implementa en etapa futura).
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  role        text not null,
  created_at  timestamptz not null default now(),

  constraint profiles_role_check
    check (role in ('admin', 'jurado'))
);

comment on table public.profiles is
  'Perfiles del equipo organizador. Se crean manualmente (ver docs/primer-admin.md), no hay flujo de self-signup.';

-- ---------------------------------------------------------------------
-- Tabla submissions
-- Una fila por obra enviada. La insertan los Route Handlers usando el
-- cliente con service_role (nunca el cliente del browser).
-- ---------------------------------------------------------------------
create table if not exists public.submissions (
  id            uuid primary key default gen_random_uuid(),
  code          text not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- Datos del estudiante
  student_name              text not null,
  student_email             text not null,
  student_age               integer not null,
  student_grade             text not null,
  school                    text not null,
  teacher_name              text,
  responsible_adult_name    text,
  responsible_adult_email   text,

  -- Datos de la obra
  category      text not null,
  title         text not null,
  pseudonym     text not null,
  word_count    integer,
  observations  text,

  -- Archivo (se completan en un segundo UPDATE, después de subir a Storage;
  -- ver flujo del POST /api/submissions documentado en el proyecto)
  file_path  text,
  file_name  text,
  file_type  text,
  file_size  integer,

  -- Declaraciones obligatorias
  declaration_original     boolean not null,
  declaration_no_ai        boolean not null,
  declaration_terms        boolean not null,
  declaration_evaluation   boolean not null,
  declaration_publication  boolean not null,

  -- Gestión interna
  status          text not null default 'recibido',
  internal_notes  text,

  constraint submissions_code_unique
    unique (code),

  constraint submissions_category_check
    check (category in ('poesia', 'cuento_breve', 'ensayo_personal')),

  constraint submissions_status_check
    check (status in (
      'recibido',
      'en_revision',
      'preseleccionado',
      'finalista',
      'ganador',
      'descartado'
    )),

  constraint submissions_student_age_check
    check (student_age between 10 and 21),

  -- Las 5 declaraciones deben ser verdaderas para que la fila exista:
  -- el Route Handler ya las valida antes de insertar, este constraint
  -- es la segunda barrera a nivel de base de datos.
  constraint submissions_declarations_check
    check (
      declaration_original
      and declaration_no_ai
      and declaration_terms
      and declaration_evaluation
      and declaration_publication
    )
);

comment on table public.submissions is
  'Obras enviadas al concurso. INSERT/UPDATE solo vía service_role desde app/api/submissions.';

comment on column public.submissions.file_path is
  'Ruta en el bucket de Storage "obras": obras/{submission_id}/{file_name}. NULL hasta que el archivo se sube correctamente.';

-- ---------------------------------------------------------------------
-- Índices para los filtros y búsquedas del panel admin
-- ---------------------------------------------------------------------
create index if not exists submissions_category_idx on public.submissions (category);
create index if not exists submissions_status_idx   on public.submissions (status);
create index if not exists submissions_school_idx    on public.submissions (school);
create index if not exists submissions_created_at_idx on public.submissions (created_at desc);

-- ---------------------------------------------------------------------
-- Trigger para mantener updated_at al día en cada UPDATE
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists submissions_set_updated_at on public.submissions;

create trigger submissions_set_updated_at
  before update on public.submissions
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Vista de monitoreo: submissions incompletas (sin archivo).
--
-- El flujo normal del POST /api/submissions hace rollback manual
-- (borra la fila) si falla la subida a Storage o el UPDATE posterior.
-- Pero ese rollback corre en el proceso de Next.js, no dentro de una
-- transacción de Postgres: si el servidor se cae justo entre el INSERT
-- y el UPDATE, el rollback nunca se ejecuta y queda una fila con
-- file_path en null para siempre. Esta vista la hace visible para que
-- el admin (o un chequeo periódico) la detecte y decida si la borra.
--
-- Cualquier fila acá NO debe considerarse una inscripción válida.
-- ---------------------------------------------------------------------
create or replace view public.incomplete_submissions as
select id, code, student_email, created_at
from public.submissions
where file_path is null
order by created_at desc;

comment on view public.incomplete_submissions is
  'Submissions sin archivo (file_path null). Indica una fila huérfana por una falla entre el INSERT y el UPDATE del POST /api/submissions; nunca es un estado final válido. Revisar y limpiar manualmente.';
