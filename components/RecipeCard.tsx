import Image from "next/image";
import Link from "next/link";
import type { RecipeSummary } from "@/lib/types";
import FavoriteButton from "./FavoriteButton";

export default function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/recetas/${recipe.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          {recipe.thumb && (
            <Image
              src={`${recipe.thumb}/medium`}
              alt={recipe.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 font-semibold">{recipe.name}</h3>
          {(recipe.category || recipe.area) && (
            <p className="mt-1 text-sm text-stone-500">
              {[recipe.category, recipe.area].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </Link>
      <FavoriteButton recipe={recipe} className="absolute right-3 top-3" />
    </article>
  );
}
