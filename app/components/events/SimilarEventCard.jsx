// Compact card used inside the similar events carousel to highlight an event summary.
"use client";

import Link from "next/link";
import { useLanguage } from "../../i18n/language-provider";

export default function SimilarEventCard({ event }) {
  const { language, t } = useLanguage();
  const locale = language === "en" ? "en-US" : "fr-FR";
  const coverImage =
    event.coverImageUrl || event.imageUrl || event.image || "/images/image.png";
  const locationLabel =
    event.manualVenue?.city ||
    event.manualVenue?.name ||
    event.location ||
    event.venueName ||
    "";
  return (
    <Link
      href={`/events/${event._id}`}
      className="shrink-0 w-60 bg-white rounded-2xl border border-gray-100 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition hover:shadow-md"
    >
      <div className="h-32 overflow-hidden rounded-t-2xl">
        <img
          src={coverImage}
          alt={event.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold text-gray-900 leading-tight">{event.title}</h3>
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {event.startDate
            ? new Date(event.startDate).toLocaleDateString(locale, { dateStyle: "medium" })
            : t("Date à confirmer")}
        </p>
        {locationLabel && (
          <p className="text-xs text-gray-400 truncate">{locationLabel}</p>
        )}
        <p className="text-xs font-semibold text-blue-600">{t("Voir l'événement")}</p>
      </div>
    </Link>
  );
}
