"use client";

import { useEffect, useState } from "react";
import type { RecipeSummary } from "@/lib/types";
import RecipeCard from "./RecipeCard";
import RecipeGridSkeleton from "./RecipeGridSkeleton";

type Status = "loading" | "ready" | "error";

export default function RecipeExplorer({ categories }: { categories: string[] }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState<RecipeSummary[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);

  // Espera un momento después de escribir para no llamar a la API en cada tecla.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (category) params.set("category", category);

    setStatus("loading");
    fetch(`/api/recipes?${params.toString()}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Respuesta no válida");
        return res.json() as Promise<{ results: RecipeSummary[] }>;
      })
      .then((data) => {
        setResults(data.results);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [debouncedQuery, category, attempt]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="buscador" className="sr-only">
          Buscar recetas
        </label>
        <input
          id="buscador"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca una receta (ej. chicken, pasta, cake)..."
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {["", ...categories].map((cat) => (
          <button
            key={cat || "todas"}
            type="button"
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${
              category === cat
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-stone-300 bg-white text-stone-700 hover:border-brand-500"
            }`}
          >
            {cat || "Todas"}
          </button>
        ))}
      </div>

      {status === "loading" && <RecipeGridSkeleton />}

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-700">No pudimos cargar las recetas.</p>
          <button
            type="button"
            onClick={() => setAttempt((n) => n + 1)}
            className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {status === "ready" && results.length === 0 && (
        <p className="rounded-xl border border-dashed border-stone-300 p-10 text-center text-stone-500">
          No encontramos recetas con esa búsqueda. Prueba con otro nombre (la base de datos está en inglés).
        </p>
      )}

      {status === "ready" && results.length > 0 && (
        <>
          <p className="text-sm text-stone-500">{results.length} recetas encontradas</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
