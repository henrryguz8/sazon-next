import type { Recipe, RecipeSummary } from "./types";

// Este módulo solo se usa en el servidor (Server Components y Route Handlers),
// así la clave nunca llega al navegador.
const BASE_URL = `https://www.themealdb.com/api/json/v1/${process.env.THEMEALDB_API_KEY ?? "1"}`;

type RawMeal = Record<string, string | null | undefined>;

async function getJson<T>(path: string, revalidate = 3600): Promise<T> {
  const res = await fetch(
    `${BASE_URL}/${path}`,
    revalidate === 0 ? { cache: "no-store" } : { next: { revalidate } },
  );
  if (!res.ok) {
    throw new Error(`TheMealDB respondió con estado ${res.status}`);
  }
  return (await res.json()) as T;
}

function toSummary(meal: RawMeal): RecipeSummary {
  return {
    id: meal.idMeal ?? "",
    name: meal.strMeal ?? "Receta sin nombre",
    thumb: meal.strMealThumb ?? "",
    category: meal.strCategory ?? undefined,
    area: meal.strArea ?? undefined,
  };
}

// La API devuelve los ingredientes en 20 campos sueltos (strIngredient1..20),
// aquí los convertimos en un arreglo limpio.
function toRecipe(meal: RawMeal): Recipe {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    if (name) {
      ingredients.push({ name, measure: meal[`strMeasure${i}`]?.trim() ?? "" });
    }
  }

  return {
    ...toSummary(meal),
    instructions: meal.strInstructions ?? "",
    tags: meal.strTags ? meal.strTags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    youtube: meal.strYoutube || undefined,
    source: meal.strSource || undefined,
    ingredients,
  };
}

export async function searchRecipes({
  q = "",
  category = "",
}: {
  q?: string;
  category?: string;
}): Promise<RecipeSummary[]> {
  const term = q.trim();
  let meals: RawMeal[];

  if (term) {
    const data = await getJson<{ meals: RawMeal[] | null }>(
      `search.php?s=${encodeURIComponent(term)}`,
    );
    meals = data.meals ?? [];
    if (category) meals = meals.filter((m) => m.strCategory === category);
  } else if (category) {
    const data = await getJson<{ meals: RawMeal[] | null }>(
      `filter.php?c=${encodeURIComponent(category)}`,
    );
    meals = data.meals ?? [];
  } else {
    // Sin búsqueda ni categoría mostramos un listado inicial.
    const data = await getJson<{ meals: RawMeal[] | null }>("search.php?f=b");
    meals = data.meals ?? [];
  }

  return meals.map(toSummary).slice(0, 24);
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const data = await getJson<{ meals: RawMeal[] | null }>(
    `lookup.php?i=${encodeURIComponent(id)}`,
  );
  const meal = data.meals?.[0];
  return meal ? toRecipe(meal) : null;
}

export async function getRandomRecipe(): Promise<Recipe | null> {
  const data = await getJson<{ meals: RawMeal[] | null }>("random.php", 0);
  const meal = data.meals?.[0];
  return meal ? toRecipe(meal) : null;
}

export async function getCategories(): Promise<string[]> {
  const data = await getJson<{ categories: { strCategory: string }[] | null }>(
    "categories.php",
    86400,
  );
  return (data.categories ?? []).map((c) => c.strCategory);
}
