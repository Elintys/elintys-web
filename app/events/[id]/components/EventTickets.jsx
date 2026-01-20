"use client";

export default function EventTickets({ tickets }) {
  if (!tickets || tickets.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Billets</h2>
      <ul className="space-y-2 text-sm text-gray-600">
        {tickets.map((ticket, index) => (
          <li key={ticket.id || ticket._id || index} className="flex justify-between">
            <span>{ticket.name || "Billet"}</span>
            <span>{ticket.price ? `${ticket.price} ${ticket.currency || "CAD"}` : "Gratuit"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
