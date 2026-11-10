# Proceso de Vibe Coding — Sazón

Este documento resume cómo construí Sazón trabajando con Claude como copiloto. Mi idea fue
usarlo para generar el código rápido, pero decidiendo yo la arquitectura y revisando todo lo que
salía antes de aceptarlo.

- **Herramienta de IA:** Claude (Anthropic)
- **Stack:** Next.js 16, TypeScript, Tailwind CSS 4
- **Temática elegida:** explorador de recetas (API de TheMealDB)

---

## 1. Concepción del proyecto

La temática era libre, así que busqué una idea que me permitiera cubrir todos los requisitos sin
inventar demasiado. Quería algo con datos reales, varias pantallas y un poco de interacción.
Elegí un explorador de recetas porque:

- TheMealDB es gratis y tiene una clave pública de pruebas, así que no hay tarjetas ni registros.
- Se puede hacer buscador, detalle, favoritos y una receta aleatoria, que dan las 4+ rutas.
- Los favoritos me sirven para practicar `useState`/`useEffect` con `localStorage`.

Antes de pedir código, le pedí a la IA que me ayudara a definir primero el mapa de rutas y la
estructura de carpetas, y lo acordamos así:

```
/            inicio          (Server Component)
/recetas     buscador        (Server + Client)
/recetas/[id] detalle        (Server Component)
/favoritos   favoritos       (Client Component)
/acerca      información     (Server Component)
```

## 2. Prompts principales

Estos son los prompts clave, resumidos (los originales eran más largos):

**Prompt 1 — Definir la arquitectura**
> Quiero crear una app en Next.js 16 con App Router y TypeScript para una tarea de Vibe Coding.
> Necesito mínimo 4 rutas, una API externa consumida con Route Handlers, Server y Client
> Components, useState/useEffect, loading y error UI y diseño responsive con Tailwind. Propón una
> temática, el mapa de rutas y la estructura de carpetas antes de escribir código.

**Prompt 2 — Capa de datos**
> Crea `lib/mealdb.ts` para consumir TheMealDB solo desde el servidor. Necesito funciones para
> buscar, obtener por id, receta aleatoria y categorías, con tipos en `lib/types.ts`. Los
> ingredientes vienen en 20 campos sueltos, conviértelos en un arreglo.

**Prompt 3 — Route Handlers**
> Crea los Route Handlers `/api/recipes`, `/api/recipes/[id]` y `/api/recipes/random`. Valida los
> parámetros y responde con un error 502 si la API externa falla. Ten en cuenta que en Next 16
> `params` es una Promesa.

**Prompt 4 — Componentes cliente**
> Crea un `RecipeExplorer` como Client Component con buscador (con debounce), filtro por
> categoría, skeleton mientras carga y un mensaje con botón de reintento si falla la petición.

**Prompt 5 — Favoritos**
> Crea un hook `useFavorites` que guarde recetas en localStorage, se sincronice entre
> componentes y pestañas, y no cause errores de hidratación.

**Prompt 6 — Páginas y detalle**
> Crea la página de detalle con ingredientes, pasos numerados, etiquetas y enlace al video.
> Agrega `loading.tsx`, `error.tsx` y `not-found.tsx`.

**Prompt 7 — Reglas del proyecto**
> Genera un `AGENTS.md` con las reglas del proyecto (estructura, convenciones, comandos y qué no
> hacer) para que cualquier asistente de IA respete la arquitectura.

## 3. Iteraciones

| # | Iteración | Qué se hizo |
| --- | --- | --- |
| 1 | Planificación | Elegir temática, rutas y estructura de carpetas. |
| 2 | Base del proyecto | Configuración de Next.js, TypeScript, Tailwind, ESLint y variables de entorno. |
| 3 | Capa de datos | `lib/mealdb.ts` y tipos compartidos. |
| 4 | API interna | Route Handlers con validación y manejo de errores. |
| 5 | Interfaz | Layout, navbar responsive, tarjetas y skeletons. |
| 6 | Interactividad | Buscador con debounce, filtros y favoritos con `localStorage`. |
| 7 | Detalle y estados | Página de detalle, `loading.tsx`, `error.tsx` y `not-found.tsx`. |
| 8 | Revisión | Lint, typecheck, build y prueba manual en móvil y escritorio. |
| 9 | Documentación | `README.md`, `AGENTS.md` y este documento. |
| 10 | Despliegue | Publicación en Vercel con la variable de entorno configurada. |

## 4. Decisiones técnicas

- **La API externa solo se llama desde el servidor.** Aunque TheMealDB no exige una clave
  secreta, preferí tratarla como si lo fuera. Así el patrón queda bien hecho: el cliente habla con
  `/api/...` y el servidor habla con TheMealDB.
- **Server Components por defecto.** Solo son Client Components los que realmente lo necesitan:
  `Navbar` (menú móvil), `RecipeExplorer` (búsqueda), `FavoriteButton`, `FavoritesList` y
  `RandomButton`.
- **Favoritos en `localStorage`** en lugar de una base de datos, para evitar login y mantener el
  proyecto simple. Es una limitación asumida: los favoritos no se comparten entre dispositivos.
- **Debounce de 400 ms** en el buscador para no hacer una petición por cada tecla.
- **`AbortController`** para cancelar peticiones viejas y evitar que una respuesta tardía pise a
  una más reciente.
- **Tailwind CSS 4** con colores de marca en `@theme` dentro de `globals.css`.
- **Sin librerías extra.** Todo se resolvió con Next, React y Tailwind para mantener control del
  código.
- **`AGENTS.md`** para dejar por escrito las reglas y que la IA no rompa las decisiones anteriores.

## 5. Desafíos y cómo se resolvieron con apoyo de la IA

**1. `params` ahora es una Promesa en Next.js 16.**
En las rutas dinámicas hay que hacer `await params`. Lo dejé indicado desde el prompt y en
`AGENTS.md` para que no se generara código con la sintaxis vieja.

**2. Los ingredientes vienen en 20 campos separados.**
TheMealDB devuelve `strIngredient1`…`strIngredient20` y `strMeasure1`…`strMeasure20`. Le pedí a la
IA que los normalizara en un arreglo dentro de `lib/mealdb.ts`, así los componentes reciben datos
limpios.

**3. La API devuelve `null` cuando no hay resultados.**
Si una búsqueda no encuentra nada, `meals` viene en `null` y rompería un `.map()`. Se resolvió con
`?? []` y un estado vacío con mensaje en la interfaz.

**4. Error de hidratación con `localStorage`.**
El servidor no tiene `localStorage`, así que el HTML inicial no coincidía con el del navegador. La
solución fue un estado `ready` en `useFavorites`: hasta que el componente se monta en el cliente, se
muestra el estado "sin favorito".

**5. Imágenes remotas en `next/image`.**
Next bloquea dominios no declarados. Se agregó `www.themealdb.com` en `remotePatterns` dentro de
`next.config.ts`.

**6. Peticiones que se pisan al escribir rápido.**
Con el debounce y `AbortController` en el `useEffect`, solo se aplica la respuesta de la última
búsqueda.

**7. Qué hacer si la API externa falla.**
Los Route Handlers responden 502 y el cliente muestra un mensaje con botón de reintento; en el
servidor, `error.tsx` captura los fallos del detalle y la portada sigue funcionando sin la receta
sugerida.

## 6. Qué aprendí

- Dar contexto y restricciones al prompt (versión, estructura, reglas) mejora mucho el resultado.
- Conviene pedir cambios pequeños y revisarlos, en vez de generar todo de una sola vez.
- La IA es muy buena para la parte repetitiva, pero hay que verificar los detalles de la versión
  del framework, porque a veces propone patrones de versiones anteriores.
- Un `AGENTS.md` bien escrito ahorra repetir las mismas instrucciones en cada conversación.

## 7. Despliegue

- **URL en producción:** `https://TU-PROYECTO.vercel.app` _(reemplazar con la URL real)_
- **Repositorio:** `https://github.com/TU-USUARIO/sazon-next` _(reemplazar con el enlace real)_
