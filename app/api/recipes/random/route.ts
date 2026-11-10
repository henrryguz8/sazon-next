import { NextResponse } from "next/server";
import { getRandomRecipe } from "@/lib/mealdb";

// GET /api/recipes/random
export async function GET() {
  try {
    const recipe = await getRandomRecipe();
    if (!recipe) {
      return NextResponse.json({ error: "No se encontró ninguna receta." }, { status: 404 });
    }
    return NextResponse.json({ recipe });
  } catch {
    return NextResponse.json(
      { error: "No se pudo obtener una receta aleatoria." },
      { status: 502 },
    );
  }
}
