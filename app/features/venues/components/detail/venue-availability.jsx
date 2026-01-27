import Link from "next/link";
import { formatDate } from "../../utils/venue-detail-utils";
import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenueAvailability({ venue, locale }) {
  const slots = venue.availability?.slots || [];
  const rules = venue.availability?.rules || [];
  const exceptions = venue.availability?.exceptions || [];
  const isAvailable = slots.length > 0 || rules.length > 0;

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-900">
          {getVenueDetailText("availability", locale)}
        </h2>
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {isAvailable
            ? getVenueDetailText("available", locale)
            : getVenueDetailText("unavailable", locale)}
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {slots.length ? (
          <div className="space-y-2">
            {slots.map((slot, index) => (
              <div
                key={`${slot.date || "slot"}-${index}`}
                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 text-xs text-gray-600"
              >
                <span>{formatDate(slot.date, locale)}</span>
                <span>
                  {slot.from || getVenueDetailText("noData", locale)} -{" "}
                  {slot.to || getVenueDetailText("noData", locale)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            {getVenueDetailText("noData", locale)}
          </p>
        )}
        {(rules.length > 0 || exceptions.length > 0) && (
          <p className="text-xs text-gray-400">
            {rules.length} {getVenueDetailText("rules", locale)} · {exceptions.length}{" "}
            {getVenueDetailText("unavailable", locale)}
          </p>
        )}
      </div>
      <Link
        href={`/venues/${venue.id}/availability`}
        className="mt-4 inline-flex rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
      >
        {getVenueDetailText("requestDate", locale)}
      </Link>
    </section>
  );
}
