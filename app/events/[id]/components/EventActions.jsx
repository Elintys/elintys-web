"use client";

export default function EventActions({ event, hasTickets }) {
  const isPublic = event.isPublic !== false;
  const primaryLabel = isPublic
    ? hasTickets
      ? "Acheter un billet"
      : "Participer"
    : "Acceder avec une invitation";

  return (
    <section className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        className="px-5 py-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
      >
        Ajouter au calendrier
      </button>
      <button
        type="button"
        className="px-5 py-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
      >
        Partager
      </button>
    </section>
  );
}
