-- 0004_simplify_submission_form.sql
-- Simplifica el formulario de participación: se sacan campos que no se
-- usan (edad, adulto responsable, cantidad de palabras, observaciones) y
-- `student_grade` pasa a ser un valor cerrado (7N a 12N) en vez de texto
-- libre, con un CHECK constraint que lo garantiza a nivel de base.
--
-- Pensado para correr sobre un proyecto que ya tiene 0001/0002/0003
-- aplicadas (como el proyecto de Supabase que ya está migrado). Todas las
-- sentencias son idempotentes (IF EXISTS / DROP+ADD del constraint), así
-- que también es seguro correrlo sobre una instalación nueva que ya haya
-- usado la versión actualizada de 0001_init.sql (ver nota al final).

-- ---------------------------------------------------------------------
-- Sacar el constraint viejo de edad antes de borrar la columna que valida
-- ---------------------------------------------------------------------
alter table public.submissions
  drop constraint if exists submissions_student_age_check;

-- ---------------------------------------------------------------------
-- Borrar columnas que ya no se usan.
--
-- OJO: esto borra datos. Si ya cargaste alguna submission de prueba con
-- estos campos completos, esa información se pierde. Para este proyecto
-- (sin datos reales todavía, edición 2026 sin abrir) es lo esperado.
-- ---------------------------------------------------------------------
alter table public.submissions drop column if exists student_age;
alter table public.submissions drop column if exists responsible_adult_name;
alter table public.submissions drop column if exists responsible_adult_email;
alter table public.submissions drop column if exists word_count;
alter table public.submissions drop column if exists observations;

-- ---------------------------------------------------------------------
-- student_grade pasa a ser un select cerrado (7N a 12N).
--
-- Si ya existen filas con un valor de student_grade fuera de esta lista
-- (por ejemplo "9no año" cargado a mano en una prueba), este ALTER va a
-- fallar con un error de violación de constraint. En ese caso, corregí o
-- borrá esas filas antes de reintentar:
--   update public.submissions set student_grade = '9N' where student_grade = '9no año';
-- ---------------------------------------------------------------------
alter table public.submissions
  drop constraint if exists submissions_student_grade_check;

alter table public.submissions
  add constraint submissions_student_grade_check
  check (student_grade in ('7N', '8N', '9N', '10N', '11N', '12N'));

-- ---------------------------------------------------------------------
-- Nota: 0001_init.sql ya fue actualizado para reflejar este mismo estado
-- final (sin estas columnas, con el CHECK de student_grade incluido desde
-- el principio), para que una instalación nueva de cero no necesite correr
-- este archivo para llegar al mismo esquema. Sobre una instalación nueva,
-- todas las sentencias de acá arriba son no-ops seguros.
-- ---------------------------------------------------------------------
