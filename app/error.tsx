"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-md space-y-4 py-20 text-center">
      <div className="text-5xl" aria-hidden="true">
        😵
      </div>
      <h1 className="text-2xl font-bold">Algo salió mal</h1>
      <p className="text-stone-600">
        Ocurrió un error inesperado al cargar esta página. Puedes intentarlo de nuevo.
      </p>
      {error.digest && <p className="text-xs text-stone-400">Código: {error.digest}</p>}
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-brand-600 px-5 py-2 font-medium text-white hover:bg-brand-700"
        >
          Reintentar
        </button>
        <Link href="/" className="rounded-full border border-stone-300 px-5 py-2 font-medium hover:bg-stone-100">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
