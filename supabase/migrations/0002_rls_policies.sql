-- 0002_rls_policies.sql
-- Row Level Security. Regla general del proyecto: el service_role (usado
-- solo dentro de Route Handlers) bypassea RLS por completo, así que estas
-- políticas gobiernan exclusivamente lo que puede hacer un usuario logueado
-- (admin) directamente contra la base, por ejemplo desde app/admin/layout.tsx
-- o desde cualquier consulta que use lib/supabase/server.ts.

alter table public.profiles   enable row level security;
alter table public.submissions enable row level security;

-- ---------------------------------------------------------------------
-- Helper: ¿el usuario autenticado actual es admin?
-- security definer para poder leer profiles sin quedar atrapado en su
-- propia política de RLS (si no, la subquery de is_admin() sobre
-- profiles dispararía de nuevo RLS y podría bloquear la lectura).
-- ---------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------
-- profiles
-- Cada usuario puede leer únicamente su propia fila (para que el admin
-- logueado pueda confirmar su rol desde el cliente si hace falta).
-- No hay política de INSERT/UPDATE/DELETE: los perfiles se crean a mano
-- desde el dashboard de Supabase o con el cliente service_role
-- (ver docs/primer-admin.md), nunca desde la app.
-- ---------------------------------------------------------------------
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

-- ---------------------------------------------------------------------
-- submissions
-- Sin política de INSERT para anon/authenticated: el alta de una obra
-- sucede exclusivamente en el Route Handler con service_role, nunca con
-- la anon key desde el browser. Sin política = acceso denegado por
-- defecto en RLS.
-- ---------------------------------------------------------------------

-- Los admins ven todas las obras, con todas las columnas.
create policy "submissions_select_admin"
  on public.submissions
  for select
  to authenticated
  using (public.is_admin());

-- Los admins pueden actualizar filas (la app restringe en el Route
-- Handler qué columnas se tocan: status e internal_notes).
create policy "submissions_update_admin"
  on public.submissions
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Nota para etapa futura (módulo jurado, fuera del MVP): el jurado no
-- debe ver columnas personales. Cuando se implemente, la forma correcta
-- es una vista `submissions_anon` (sin student_name, student_email,
-- school, teacher_name, responsible_adult_*) con su propia policy de
-- SELECT para role = 'jurado', en vez de darle acceso a la tabla base.
