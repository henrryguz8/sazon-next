import { NextResponse } from "next/server";
import { getRecipeById } from "@/lib/mealdb";

// GET /api/recipes/52772
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Identificador inválido." }, { status: 400 });
  }

  try {
    const recipe = await getRecipeById(id);
    if (!recipe) {
      return NextResponse.json({ error: "Receta no encontrada." }, { status: 404 });
    }
    return NextResponse.json({ recipe });
  } catch {
    return NextResponse.json({ error: "Error al consultar la receta." }, { status: 502 });
  }
}
