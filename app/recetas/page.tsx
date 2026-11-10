import type { Metadata } from "next";
import RecipeExplorer from "@/components/RecipeExplorer";
import { getCategories } from "@/lib/mealdb";

export const metadata: Metadata = {
  title: "Recetas",
  description: "Busca recetas por nombre o filtra por categoría.",
};

export default async function RecetasPage() {
  // Las categorías se cargan en el servidor; la búsqueda interactiva vive en el cliente.
  const categories = await getCategories().catch(() => []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Recetas</h1>
        <p className="mt-1 text-stone-600">Busca por nombre o filtra por categoría.</p>
      </header>
      <RecipeExplorer categories={categories} />
    </div>
  );
}
