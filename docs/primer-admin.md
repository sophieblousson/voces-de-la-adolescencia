# Crear el primer usuario admin

No hay pantalla de self-signup: los usuarios admin se crean a mano. Dos formas, elegí una.

> **Seguridad:** `SUPABASE_SERVICE_ROLE_KEY` tiene privilegios totales sobre la base (bypassea RLS). No la pegues en un script versionado, no la loguees, y si la usaste en una terminal compartida, limpiá el historial. Lo mismo para cualquier contraseña de admin: no la dejes en texto plano en un chat o documento después de crearla.

## Opción A — Dashboard de Supabase (recomendada)

1. Andá a **Authentication → Users** en el dashboard del proyecto.
2. Click en **Add user → Create new user**.
3. Cargá email y contraseña. Dejá tildado "Auto Confirm User" para no depender de un flujo de email.
4. Copiá el **UUID** del usuario recién creado (columna `id` en la tabla de usuarios, o en el detalle del usuario).
5. Andá a **Table Editor → profiles** (o al SQL Editor) e insertá la fila de perfil:

```sql
insert into public.profiles (id, email, role)
values ('PEGAR-EL-UUID-ACA', 'admin@activelearning.edu', 'admin');
```

6. Listo. Ese email/contraseña ya puede loguearse en `/admin/login` cuando esa pantalla exista (Etapa 4).

## Opción B — Por script, con la Admin API de Supabase

Útil si en algún momento necesitás crear varios admins de una y no querés hacerlo a mano en el dashboard. Requiere `SUPABASE_SERVICE_ROLE_KEY` (nunca la expongas en un script que corra en el browser; esto es para correr una sola vez desde tu máquina o una función de servidor).

```bash
curl -X POST 'https://TU-PROYECTO.supabase.co/auth/v1/admin/users' \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@activelearning.edu",
    "password": "UNA-CONTRASEÑA-FUERTE-ACA",
    "email_confirm": true
  }'
```

La respuesta trae el `id` (UUID) del usuario creado. Con ese UUID, corré el mismo `insert into public.profiles` de la Opción A.

Para la gran mayoría de los casos (1 a 3 admins), la Opción A del dashboard alcanza y es más simple.

## Verificar que quedó bien

```sql
select p.id, p.email, p.role, u.email as auth_email
from public.profiles p
join auth.users u on u.id = p.id
where p.role = 'admin';
```

Debería devolver la fila que acabás de crear, con `p.email` y `u.email` coincidiendo.

## Agregar más admins o, más adelante, jurado

Mismo procedimiento: crear el usuario en Authentication → Users, después insertar en `profiles` con el `role` correspondiente (`'admin'` por ahora; `'jurado'` cuando esa etapa se implemente).
