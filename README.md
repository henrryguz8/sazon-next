# 🍲 Sazón — Explorador de recetas

Aplicación web hecha con **Next.js 16 (App Router)**, **TypeScript** y **Tailwind CSS** siguiendo
la metodología de **Vibe Coding**: la IA genera el código y yo dirijo, reviso y corrijo cada paso.

- 🌐 **Despliegue:** `https://sazon-next.vercel.app/` 
- 📝 **Proceso de Vibe Coding:** ver [VIBE_CODING.md](./VIBE_CODING.md)
- 🤖 **Reglas para la IA:** ver [AGENTS.md](./AGENTS.md)

## ¿Qué hace la app?

- Busca recetas por nombre y las filtra por categoría.
- Muestra el detalle completo: ingredientes, pasos y video.
- Sugiere una receta al azar.
- Guarda tus recetas favoritas en el navegador.

## Rutas

| Ruta | Descripción | Tipo |
| --- | --- | --- |
| `/` | Inicio con receta sugerida | Server Component |
| `/recetas` | Buscador con filtros | Server + Client |
| `/recetas/[id]` | Detalle de receta | Server Component |
| `/favoritos` | Recetas guardadas | Client Component |
| `/acerca` | Información del proyecto | Server Component |
| `/api/recipes` | Búsqueda (Route Handler) | API interna |
| `/api/recipes/[id]` | Detalle (Route Handler) | API interna |
| `/api/recipes/random` | Receta aleatoria (Route Handler) | API interna |

## Requisitos técnicos cubiertos

- ✅ Next.js 16 con App Router y TypeScript
- ✅ 5 páginas distintas (`/`, `/recetas`, `/recetas/[id]`, `/favoritos`, `/acerca`)
- ✅ API externa (TheMealDB) consumida mediante Route Handlers
- ✅ Server Components y Client Components combinados
- ✅ Estado con `useState` y `useEffect`
- ✅ Diseño responsive (móvil y escritorio) con Tailwind
- ✅ Loading UI (`loading.tsx` y skeletons) y Error UI (`error.tsx`)
- ✅ Variables de entorno con `.env.local` y `.env.example`

## Instalación

Requiere **Node.js 20.9 o superior**.

```bash
# 1. Clonar el repositorio
git clone https://github.com/henrryguz8/sazon-next.git
cd sazon-next

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Iniciar en modo desarrollo
npm run dev
```

Abre http://localhost:3000 en el navegador.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `THEMEALDB_API_KEY` | Clave de TheMealDB. Con `1` (clave pública de pruebas) funciona sin registro. |

## Scripts

```bash
npm run dev        # desarrollo
npm run build      # compilar para producción
npm run start      # ejecutar la compilación
npm run lint       # ESLint
npm run typecheck  # revisión de tipos
```

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En [vercel.com](https://vercel.com) elige **Add New → Project** e importa el repositorio.
3. En **Environment Variables** agrega `THEMEALDB_API_KEY` con el valor `1`.
4. Presiona **Deploy**. Cada `git push` a `main` vuelve a desplegar automáticamente.

## Estructura

```
app/          Rutas, layouts, loading, error y Route Handlers
components/   Componentes de interfaz
hooks/        Hooks personalizados (useFavorites)
lib/          Acceso a la API y tipos compartidos
AGENTS.md     Reglas del proyecto para asistentes de IA
VIBE_CODING.md  Registro del proceso con IA
```

## Créditos

Datos de recetas: [TheMealDB](https://www.themealdb.com). Proyecto académico.
