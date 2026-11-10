import { NextRequest, NextResponse } from "next/server";
import { searchRecipes } from "@/lib/mealdb";

// GET /api/recipes?q=pasta&category=Seafood
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const q = (searchParams.get("q") ?? "").slice(0, 60);
  const rawCategory = searchParams.get("category") ?? "";
  // Solo aceptamos letras y espacios para la categoría.
  const category = /^[A-Za-z ]{0,40}$/.test(rawCategory) ? rawCategory : "";

  try {
    const results = await searchRecipes({ q, category });
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: "No se pudo consultar el catálogo de recetas." },
      { status: 502 },
    );
  }
}
