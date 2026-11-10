import type { Metadata } from "next";
import FavoritesList from "@/components/FavoritesList";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Tus recetas guardadas.",
};

export default function FavoritosPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Mis favoritos</h1>
        <p className="mt-1 text-stone-600">Las recetas que guardaste en este navegador.</p>
      </header>
      <FavoritesList />
    </div>
  );
}
