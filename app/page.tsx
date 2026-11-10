import Image from "next/image";
import Link from "next/link";
import RandomButton from "@/components/RandomButton";
import { getRandomRecipe } from "@/lib/mealdb";

const features = [
  { icon: "🔎", title: "Busca y filtra", text: "Encuentra recetas por nombre o por categoría en segundos." },
  { icon: "🎲", title: "Descubre", text: "¿No sabes qué cocinar? Deja que Sazón te sorprenda." },
  { icon: "❤️", title: "Guarda favoritos", text: "Tu lista se queda en tu navegador, sin cuentas ni registros." },
];

export default async function HomePage() {
  // Si la API externa falla, la portada sigue funcionando sin la receta del día.
  const featured = await getRandomRecipe().catch(() => null);

  return (
    <div className="space-y-14">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Explorador de recetas
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            ¿Qué vamos a <span className="text-brand-600">cocinar</span> hoy?
          </h1>
          <p className="text-lg text-stone-600">
            Miles de recetas de todo el mundo, con ingredientes, pasos y videos. Busca, descubre y
            guarda las que más te gusten.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/recetas"
              className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Ver recetas
            </Link>
            <RandomButton />
          </div>
        </div>

        {featured && (
          <Link
            href={`/recetas/${featured.id}`}
            className="group relative block overflow-hidden rounded-3xl shadow-lg"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={featured.thumb}
                alt={featured.name}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
              <p className="text-xs uppercase tracking-wide opacity-80">Sugerencia del momento</p>
              <p className="text-xl font-bold">{featured.name}</p>
            </div>
          </Link>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="text-3xl" aria-hidden="true">
              {f.icon}
            </div>
            <h2 className="mt-3 font-semibold">{f.title}</h2>
            <p className="mt-1 text-sm text-stone-600">{f.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
