const FinalCta = ({ text }) => (
  <section className="py-12 sm:py-16">
    <div className="container mx-auto px-4">
      <div className="rounded-3xl border border-indigo-100 bg-white px-6 py-10 text-center shadow-sm">
        <p className="text-base sm:text-lg text-gray-700">{text}</p>
      </div>
    </div>
  </section>
);

export default FinalCta;
