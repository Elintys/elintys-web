"use client";

import Link from "next/link";

export default function EventOrganizerActions({ eventId, status }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Actions organisateur</h2>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
          {status}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/events/${eventId}/edit`}
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
        >
          Modifier l'evenement
        </Link>
        <Link
          href={`/events/${eventId}/participants`}
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
        >
          Voir les participants
        </Link>
        <Link
          href={`/events/${eventId}/collaborators`}
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
        >
          Gerer les prestataires
        </Link>
      </div>
    </section>
  );
}
