import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import { getRecipeById } from "@/lib/mealdb";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return { title: "Receta no encontrada" };
  const recipe = await getRecipeById(id).catch(() => null);
  return { title: recipe?.name ?? "Receta no encontrada" };
}

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  // Si la API falla, el error lo captura app/error.tsx.
  const recipe = await getRecipeById(id);
  if (!recipe) notFound();

  const steps = recipe.instructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <article className="space-y-8">
      <Link href="/recetas" className="text-sm text-brand-600 hover:underline">
        ← Volver a recetas
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100 shadow-lg">
          <Image
            src={recipe.thumb}
            alt={recipe.name}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{recipe.name}</h1>
          <p className="text-stone-600">{[recipe.category, recipe.area].filter(Boolean).join(" · ")}</p>

          {recipe.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <FavoriteButton
              recipe={{
                id: recipe.id,
                name: recipe.name,
                thumb: recipe.thumb,
                category: recipe.category,
                area: recipe.area,
              }}
              withLabel
              className="border border-stone-200"
            />
            {recipe.youtube && (
              <a
                href={recipe.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                ▶ Ver video
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 md:col-span-1">
          <h2 className="mb-4 text-xl font-bold">Ingredientes</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((item) => (
              <li key={item.name} className="flex justify-between gap-3 border-b border-stone-100 pb-2 text-sm">
                <span>{item.name}</span>
                <span className="text-stone-500">{item.measure}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="md:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Preparación</h2>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-stone-700">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
