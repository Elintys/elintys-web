"use client";

const MetaItem = ({ label, value, icon }) => (
  <div className="flex items-start gap-3">
    <span className="mt-1 text-indigo-600">{icon}</span>
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className="text-sm text-gray-700">{value}</p>
    </div>
  </div>
);

export default function EventMeta({ dateLabel, locationLabel, categoryLabel, organizer }) {
  return (
    <section className="grid gap-4 md:grid-cols-4 bg-white rounded-2xl border border-gray-100 p-5 shadow">
      <MetaItem
        label="Date"
        value={dateLabel}
        icon={
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M7 2a1 1 0 0 0-1 1v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-1-1zm12 8H5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9z" />
          </svg>
        }
      />
      <MetaItem
        label="Lieu"
        value={locationLabel}
        icon={
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
          </svg>
        }
      />
      <MetaItem
        label="Categorie"
        value={categoryLabel || "—"}
        icon={
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M4 6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
          </svg>
        }
      />
      <MetaItem
        label="Organisateur"
        value={organizer || "—"}
        icon={
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M12 2a5 5 0 0 1 5 5v1a5 5 0 1 1-10 0V7a5 5 0 0 1 5-5zm-7 18a7 7 0 0 1 14 0v2H5v-2z" />
          </svg>
        }
      />
    </section>
  );
}
