import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca del proyecto",
  description: "Cómo se construyó Sazón con Next.js 16 y Vibe Coding.",
};

const stack = [
  ["Next.js 16 (App Router)", "Rutas, Server Components, Route Handlers y loading/error UI."],
  ["TypeScript", "Tipado estricto en todo el proyecto."],
  ["Tailwind CSS 4", "Estilos responsive mobile-first."],
  ["TheMealDB", "API externa de recetas, consultada solo desde el servidor."],
  ["localStorage", "Persistencia de favoritos en el navegador."],
];

export default function AcercaPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Acerca de Sazón</h1>
        <p className="mt-2 text-stone-600">
          Sazón es una aplicación hecha como práctica de Vibe Coding: la IA propone y genera código,
          y yo dirijo la arquitectura, reviso cada resultado y corrijo lo que haga falta. El proceso
          completo está documentado en el archivo <code>VIBE_CODING.md</code> del repositorio.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-bold">Tecnologías</h2>
        <ul className="space-y-2">
          {stack.map(([name, desc]) => (
            <li key={name} className="rounded-xl border border-stone-200 bg-white p-4">
              <span className="font-semibold">{name}</span>
              <span className="text-stone-600"> — {desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Rutas de la aplicación</h2>
        <ul className="list-inside list-disc space-y-1 text-stone-700">
          <li><code>/</code> — Inicio con receta sugerida</li>
          <li><code>/recetas</code> — Buscador con filtros</li>
          <li><code>/recetas/[id]</code> — Detalle de una receta</li>
          <li><code>/favoritos</code> — Recetas guardadas</li>
          <li><code>/acerca</code> — Esta página</li>
          <li><code>/api/recipes</code>, <code>/api/recipes/[id]</code>, <code>/api/recipes/random</code> — Route Handlers</li>
        </ul>
      </section>
    </div>
  );
}
