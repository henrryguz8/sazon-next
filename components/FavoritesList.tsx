"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import RecipeCard from "./RecipeCard";
import RecipeGridSkeleton from "./RecipeGridSkeleton";

export default function FavoritesList() {
  const { favorites, ready } = useFavorites();

  if (!ready) return <RecipeGridSkeleton count={4} />;

  if (favorites.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300 p-10 text-center">
        <p className="text-stone-600">Todavía no has guardado ninguna receta.</p>
        <Link
          href="/recetas"
          className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2 font-medium text-white hover:bg-brand-700"
        >
          Explorar recetas
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {favorites.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
