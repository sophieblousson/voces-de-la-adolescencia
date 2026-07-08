-- 0003_storage_bucket.sql
-- Bucket privado para los archivos de las obras (.doc/.docx/.pdf).
--
-- En la práctica, todas las subidas y descargas de archivos del MVP pasan
-- por Route Handlers que usan el cliente con service_role (que bypassea
-- RLS), así que estas políticas de storage.objects son una segunda capa
-- de seguridad (defensa en profundidad), no el mecanismo principal:
-- - Sin ninguna política, un usuario autenticado no admin no podría
--   hacer nada igual (private bucket + RLS deniega por defecto).
-- - Con la política de abajo, un admin logueado SÍ podría listar/leer
--   objetos directamente si en el futuro se necesita sin pasar por un
--   Route Handler.

insert into storage.buckets (id, name, public)
values ('obras', 'obras', false)
on conflict (id) do nothing;

-- Los admins pueden leer objetos del bucket "obras" directamente
-- (además del mecanismo principal de signed URLs generadas server-side).
create policy "obras_select_admin"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'obras'
    and public.is_admin()
  );

-- No se agregan políticas de INSERT/UPDATE/DELETE para authenticated ni
-- anon: la subida del archivo ocurre únicamente en el Route Handler
-- POST /api/submissions, usando el cliente con service_role.
