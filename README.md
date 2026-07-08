# Voces de la Adolescencia 2026

Sitio del concurso literario institucional de Active Learning. Etapa 2: base de datos y storage.

## Stack

- Next.js 14 (App Router) + TypeScript
- CSS propio (sin Tailwind), tokens de marca en `styles/tokens.css`
- Supabase (Postgres + Auth + Storage)
- Netlify (hosting)

## Logo institucional

`components/layout/Logo.tsx` carga el logo de Active Learning desde `/public`. Falta colocar el archivo real en:

```
public/logo-active-learning.svg   (preferido)
public/logo-active-learning.png   (alternativa)
```

Hasta que el archivo exista, el componente muestra un placeholder "AL" con borde punteado en Header y Footer — no rompe el layout, pero avisa visualmente que falta el asset.

## Setup local

```bash
npm install
cp .env.local.example .env.local
# completar .env.local con los datos del proyecto Supabase
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) para ver la landing completa, y `/bases` para las bases y condiciones.

## Variables de entorno

Ver `.env.local.example`. Resumen:

| Variable | Dónde se usa |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | cliente y servidor |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | cliente y servidor (respeta RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | **solo** dentro de Route Handlers (`app/api/**`) |
| `NEXT_PUBLIC_SITE_URL` | armar links absolutos si hace falta |

## Estructura

Ver el documento de arquitectura MVP para el detalle completo de rutas, tablas y endpoints. Resumen de carpetas:

- `app/(public)/` — sitio institucional público (`/`, `/bases`, `/participar`, `/confirmacion`)
- `app/admin/` — panel del equipo organizador, protegido por sesión Supabase
- `app/api/` — Route Handlers (`/api/submissions`, `/api/export`)
- `components/` — organizados por sección (`home`, `bases`, `form`, `admin`, `ui`)
- `lib/supabase/` — tres clientes: `client.ts` (browser), `server.ts` (sesión admin), `admin.ts` (service_role, solo server)
- `lib/constants.ts` — categorías, estados, fechas clave, límites de archivo
- `styles/tokens.css` — única fuente de verdad para colores y tipografía de marca
- `supabase/migrations/` — SQL de las tablas, constraints, RLS y bucket de Storage (Etapa 2, completo)

## Estado actual (Etapa 2)

- [x] Proyecto Next.js + TS sin Tailwind
- [x] Estructura de carpetas
- [x] Tokens de marca (Helvetica + colores Active Learning, fondos claros)
- [x] `lib/constants.ts`
- [x] Clientes de Supabase (`client.ts`, `server.ts`, `admin.ts`)
- [x] `netlify.toml`
- [x] Landing completa (`/`) y `/bases`
- [x] Logo institucional (componente con fallback, falta cargar el asset real)
- [x] Migraciones SQL: tablas, constraints, índices, RLS, bucket de Storage
- [x] Instrucciones para crear el primer admin (`docs/primer-admin.md`)
- [ ] Formulario de participación funcional (Etapa 3)
- [ ] Panel admin visual (Etapa 4)
- [ ] Exportaciones (Etapa 5)

## Base de datos (Etapa 2)

Las migraciones están en `supabase/migrations/`, en orden:

1. `0001_init.sql` — tablas `profiles` y `submissions`, constraints (categorías, estados, declaraciones obligatorias, edad), índices para los filtros del admin, trigger de `updated_at`.
2. `0002_rls_policies.sql` — Row Level Security: función `is_admin()`, política para que cada usuario lea su propio `profile`, y políticas para que solo admins lean/actualicen `submissions`. No hay política de INSERT: el alta de obras ocurre siempre vía service_role desde el Route Handler.
3. `0003_storage_bucket.sql` — bucket privado `obras` + política de lectura para admins (defensa en profundidad; el mecanismo principal de descarga es una signed URL generada server-side).

Para aplicarlas: pegar cada archivo en el SQL Editor de Supabase, en orden, o usar `supabase db push` si tenés la CLI configurada contra el proyecto.

Para crear el primer usuario admin, ver `docs/primer-admin.md`.

## Deploy en Netlify

1. Conectar el repo en Netlify.
2. Build command: `npm run build` (ya definido en `netlify.toml`).
3. Publish directory: `.next` (vía `@netlify/plugin-nextjs`, ya declarado en `netlify.toml`).
4. Cargar las variables de entorno del punto anterior en Netlify → Site settings → Environment variables.
