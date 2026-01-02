// components/EventCard.jsx
import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <Link href={`/events/${event._id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
        <img
          src={event.image || "/images/image.png"}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-blue-400 mb-1">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{event.category}</p>
          <p className="text-gray-500 text-sm">
            {new Date(event.startDate).toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>
    </Link>
  );
}
