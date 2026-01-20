// components/EventCard.jsx
"use client";

import Link from "next/link";
import { useLanguage } from "../i18n/LanguageProvider";

export default function EventCard({ event }) {
  const { language, t } = useLanguage();
  const locale = language === "en" ? "en-US" : "fr-FR";
  const coverImage =
    event.coverImageUrl || event.imageUrl || event.image || "/images/image.png";
  const categoryLabel =
    event.category?.name || event.categoryName || event.category || event.categoryId;

  return (
    <Link href={`/events/${event._id}`}>
      <div className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md transition cursor-pointer overflow-hidden">
        <img
          src={coverImage}
          alt={event.title}
          className="w-full h-44 object-cover"
        />
        <div className="p-4 space-y-2">
          {categoryLabel && (
            <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-500">
              {categoryLabel}
            </span>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {event.startDate
              ? new Date(event.startDate).toLocaleDateString(locale, { dateStyle: "medium" })
              : t("Date a confirmer")}
          </p>
        </div>
      </div>
    </Link>
  );
}
