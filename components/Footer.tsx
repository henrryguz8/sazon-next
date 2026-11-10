export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white py-6 text-center text-sm text-stone-500">
      <p>
        Sazón · Proyecto hecho con Next.js 16 y Vibe Coding · Datos de{" "}
        <a
          href="https://www.themealdb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-brand-600"
        >
          TheMealDB
        </a>
      </p>
    </footer>
  );
}
