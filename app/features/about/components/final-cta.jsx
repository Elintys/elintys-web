import Link from "next/link";

const FinalCta = ({ text }) => (
  <section className="py-12 sm:py-16">
    <div className="container mx-auto px-4">
      <div className="rounded-3xl bg-indigo-600 shadow-sm px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex justify-end">
          <button
            className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-gray-100 transition"
          >
            {text}
          </button>
        </div>
      </div>
    </div>
  </section>
);


export default FinalCta;
