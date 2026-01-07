// components/EventCard.jsx
import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <Link href={`/events/${event._id}`}>
      <div className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md transition cursor-pointer overflow-hidden">
        <img
          src={event.image || "/images/image.png"}
          alt={event.title}
          className="w-full h-44 object-cover"
        />
        <div className="p-4 space-y-2">
          {event.category && (
            <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-500">
              {event.category}
            </span>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {event.startDate
              ? new Date(event.startDate).toLocaleDateString("fr-FR", { dateStyle: "medium" })
              : "Date a confirmer"}
          </p>
        </div>
      </div>
    </Link>
  );
}
