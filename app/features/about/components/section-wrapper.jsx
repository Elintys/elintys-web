const SectionWrapper = ({ id, title, description, children, className = "" }) => (
  <section id={id} className={`py-12 sm:py-16 ${className}`.trim()}>
    <div className="container mx-auto px-4">
      <div className="max-w-3xl">
        {title ? (
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-8">{children}</div>
    </div>
  </section>
);

export default SectionWrapper;
