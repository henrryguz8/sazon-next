"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RandomButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/recipes/random");
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { recipe: { id: string } };
      router.push(`/recetas/${data.recipe.id}`);
    } catch {
      setError("No pudimos sorprenderte esta vez, intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="rounded-full border border-brand-600 px-6 py-3 font-semibold text-brand-600 transition hover:bg-brand-50 disabled:opacity-60"
      >
        {loading ? "Buscando..." : "🎲 Sorpréndeme"}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
