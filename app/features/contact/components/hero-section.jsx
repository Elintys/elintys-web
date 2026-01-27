const HeroSection = ({ title, subtitle }) => (
  <section className="bg-gradient-to-br from-indigo-50 via-white to-slate-50">
    <div className="container mx-auto px-4 py-16 sm:py-20">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600">
          {subtitle}
        </p>
      </div>
    </div>
  </section>
);

export default HeroSection;
