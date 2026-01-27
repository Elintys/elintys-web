import Link from "next/link";

const HeroSection = ({ title, subtitle, ctaLabel, ctaHref }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-slate-50">
    <div className="absolute inset-0">
      <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-slate-100 blur-3xl" />
    </div>
    <div className="relative container mx-auto px-4 py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
          Elintys
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600">
          {subtitle}
        </p>
        <div className="mt-8">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
