import Link from "next/link";
import {
  formatDay,
  formatMonth,
  formatTime,
  getEventCategoryLabel,
  getEventCoverImage,
  getEventLocationLabel,
  getEventPriceLabel,
} from "../../utils/event-formatters";

export default function EventListCard({ event, locale, t }) {
  const eventDate = event.startDate ? new Date(event.startDate) : null;
  const month = eventDate ? formatMonth(event.startDate, locale) : t("DATE");
  const day = eventDate ? formatDay(event.startDate, locale) : "--";
  const coverImage = getEventCoverImage(event);
  const categoryLabel = getEventCategoryLabel(event);
  const location = getEventLocationLabel(event, t);
  const priceLabel = getEventPriceLabel(event, t);
  const interested = event.interestedCount || 0;

  return (
    <Link
      href={`/events/${event._id}`}
      className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md transition overflow-hidden"
    >
      <div className="relative">
        <img src={coverImage} alt={event.title} className="h-44 w-full object-cover" />
        {categoryLabel && (
          <span className="absolute left-3 bottom-3 bg-yellow-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded">
            {categoryLabel}
          </span>
        )}
        <button
          type="button"
          aria-label={t("Ajouter aux favoris")}
          className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:text-indigo-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
      </div>
      <div className="p-4 flex gap-4">
        <div className="text-center min-w-[44px]">
          <p className="text-xs text-indigo-600 font-semibold">{month}</p>
          <p className="text-lg font-bold text-gray-900">{day}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-gray-900 leading-snug">
            {event.title}
          </h3>
          <p className="text-xs text-gray-500">{location}</p>
          {eventDate && (
            <p className="text-xs text-gray-500">
              {formatTime(event.startDate, locale)}
              {event.endDate ? ` - ${formatTime(event.endDate, locale)}` : ""}
            </p>
          )}
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3"
              >
                <path d="M7 2a1 1 0 0 0-1 1v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-1-1zm12 8H5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9z" />
              </svg>
              {priceLabel}
            </span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 5h-2v6l5 3 1-1.73-4-2.27V7z" />
              </svg>
              {interested} {t("interesses")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
