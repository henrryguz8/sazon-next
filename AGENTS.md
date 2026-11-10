# AGENTS.md — Reglas del proyecto Sazón

Este archivo le explica a cualquier asistente de IA (Claude, Copilot, Cursor, etc.) cómo
trabajar en este repositorio. Léelo completo antes de generar o modificar código.

## Contexto

Sazón es un explorador de recetas hecho con **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**.
Consume la API pública de TheMealDB a través de Route Handlers propios y guarda los favoritos en
`localStorage`. Es un proyecto académico de Vibe Coding: el código lo genera la IA, pero la
arquitectura y la revisión final son responsabilidad de la persona que desarrolla.

## Comandos

- `npm install` — instalar dependencias
- `npm run dev` — servidor de desarrollo (http://localhost:3000)
- `npm run lint` — revisar con ESLint
- `npm run typecheck` — revisar tipos con TypeScript
- `npm run build` — compilar para producción (debe pasar antes de cada despliegue)

## Estructura

```
app/            Rutas del App Router (pages, layouts, loading, error, route handlers)
app/api/        Route Handlers (la API interna que consume el cliente)
components/     Componentes de UI reutilizables
hooks/          Hooks personalizados de React (solo cliente)
lib/            Lógica de servidor y tipos compartidos (mealdb.ts, types.ts)
```

## Reglas de código

1. **TypeScript estricto.** Prohibido usar `any`. Los tipos compartidos viven en `lib/types.ts`.
2. **Server Components por defecto.** Solo se agrega `"use client"` cuando el componente necesita
   estado, efectos, eventos del navegador o APIs como `localStorage`.
3. **Next.js 16:** `params` y `searchParams` son **Promesas** y se leen con `await`. No usar APIs
   obsoletas de versiones anteriores.
4. **Datos externos.** Toda llamada a TheMealDB pasa por `lib/mealdb.ts`. Los componentes cliente
   nunca llaman a la API externa directamente: usan los Route Handlers de `app/api/`.
5. **Estados de carga y error.** Cada ruta con datos remotos debe tener su `loading.tsx` o un
   skeleton, y los fallos deben manejarse con `error.tsx` o con un mensaje en pantalla.
6. **Hooks.** Usar `useState` y `useEffect` con limpieza (timeouts, listeners, `AbortController`).
7. **Estilos.** Solo Tailwind CSS, mobile-first (`sm:`, `md:`, `lg:`). Los colores de marca están
   definidos en `app/globals.css` (`brand-*`).
8. **Accesibilidad.** Texto alternativo en imágenes, `aria-label` en botones de solo icono y
   etiquetas en los campos de formulario.
9. **Imágenes.** Usar siempre `next/image`; los dominios permitidos están en `next.config.ts`.
10. **Idioma.** Texto de la interfaz y comentarios en español. Nombres de variables y funciones en inglés.

## Seguridad y variables de entorno

- Las claves y configuraciones se guardan en `.env.local` (ignorado por Git).
- Toda variable nueva debe documentarse en `.env.example` sin valores reales.
- Nunca poner secretos en código ni usar el prefijo `NEXT_PUBLIC_` para claves privadas.

## Flujo de trabajo con la IA

- Hacer cambios pequeños y revisables; un tema por vez.
- Revisar cada cambio generado: que compile, que respete estas reglas y que no agregue
  dependencias innecesarias.
- Si la IA propone una dependencia nueva, justificarla antes de instalarla.
- Commits con mensajes descriptivos (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`).
- Documentar los prompts y decisiones importantes en `VIBE_CODING.md`.

## Qué NO hacer

- No reescribir archivos completos si basta con un cambio puntual.
- No mezclar lógica de servidor (`lib/mealdb.ts`) dentro de componentes cliente.
- No guardar datos personales ni claves en `localStorage`.
- No eliminar los estados de carga/error para "simplificar".
