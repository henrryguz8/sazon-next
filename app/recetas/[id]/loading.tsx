export default function LoadingRecipe() {
  return (
    <div className="animate-pulse space-y-6" role="status" aria-label="Cargando receta">
      <div className="h-4 w-32 rounded bg-stone-200" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-stone-200" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 rounded bg-stone-200" />
          <div className="h-4 w-1/2 rounded bg-stone-200" />
          <div className="h-10 w-40 rounded-full bg-stone-200" />
        </div>
      </div>
      <div className="h-64 rounded-2xl bg-stone-200" />
    </div>
  );
}
