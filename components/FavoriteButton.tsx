"use client";

import { useFavorites } from "@/hooks/useFavorites";
import type { RecipeSummary } from "@/lib/types";

type Props = {
  recipe: RecipeSummary;
  withLabel?: boolean;
  className?: string;
};

export default function FavoriteButton({ recipe, withLabel = false, className = "" }: Props) {
  const { isFavorite, toggle, ready } = useFavorites();
  const active = ready && isFavorite(recipe.id);

  return (
    <button
      type="button"
      onClick={() => toggle(recipe)}
      aria-pressed={active}
      aria-label={active ? `Quitar ${recipe.name} de favoritos` : `Guardar ${recipe.name} en favoritos`}
      className={`inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-medium shadow transition hover:scale-105 ${
        active ? "text-red-600" : "text-stone-600"
      } ${className}`}
    >
      <span aria-hidden="true">{active ? "❤️" : "🤍"}</span>
      {withLabel && <span>{active ? "En favoritos" : "Guardar en favoritos"}</span>}
    </button>
  );
}
