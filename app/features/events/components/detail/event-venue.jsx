"use client";

export default function EventVenue({ venue }) {
  if (!venue || !venue.name) return null;

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow p-6 space-y-3">
      <h2 className="text-xl font-semibold text-gray-900">Lieu</h2>
      <p className="text-sm font-semibold text-gray-800">{venue.name}</p>
      <p className="text-sm text-gray-600">{venue.address}</p>
      <p className="text-sm text-gray-500">
        {[venue.city, venue.country].filter(Boolean).join(", ")}
      </p>
      {venue.capacity && (
        <p className="text-xs text-gray-400">
          Capacite: {venue.capacity?.min || "—"} - {venue.capacity?.max || "—"}
        </p>
      )}
    </section>
  );
}
