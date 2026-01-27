import Link from "next/link";

const UpcomingEventsCard = ({ upcomingEvents, locale, t }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-900">
      {t("Prochains evenements")}
    </h3>
    <div className="mt-4 space-y-3">
      {upcomingEvents.map((event) => (
        <Link
          key={event._id}
          href={`/events/${event._id}`}
          className="flex items-center justify-between text-sm text-gray-600 hover:text-indigo-600"
        >
          <span>{event.title}</span>
          <span>{new Date(event.startDate).toLocaleDateString(locale)}</span>
        </Link>
      ))}
      {!upcomingEvents.length && (
        <p className="text-sm text-gray-500">{t("Aucun evenement a venir.")}</p>
      )}
    </div>
  </div>
);

export default UpcomingEventsCard;
