import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md space-y-4 py-20 text-center">
      <div className="text-5xl" aria-hidden="true">
        🍳
      </div>
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p className="text-stone-600">Parece que esta receta no está en el menú.</p>
      <Link
        href="/recetas"
        className="inline-block rounded-full bg-brand-600 px-5 py-2 font-medium text-white hover:bg-brand-700"
      >
        Ver todas las recetas
      </Link>
    </div>
  );
}
