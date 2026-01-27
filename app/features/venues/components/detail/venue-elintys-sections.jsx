import Link from "next/link";
import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenueElintysSections({ venue, locale }) {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">
          {getVenueDetailText("recommendedProviders", locale)}
        </h2>
        <div className="mt-4 space-y-3">
          {(venue.recommendedProviders || []).map((provider) => (
            <div
              key={provider.id}
              className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 text-sm text-gray-600"
            >
              <span>{provider.name}</span>
              <Link
                href={`/providers/${provider.id}`}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                {getVenueDetailText("view", locale)}
              </Link>
            </div>
          ))}
          {!venue.recommendedProviders?.length && (
            <p className="text-sm text-gray-600">{getVenueDetailText("noData", locale)}</p>
          )}
        </div>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">
          {getVenueDetailText("pastEvents", locale)}
        </h2>
        <div className="mt-4 space-y-3">
          {(venue.pastEvents || []).map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 text-sm text-gray-600"
            >
              <span>{event.name}</span>
              <span className="text-xs text-gray-400">{event.date}</span>
            </div>
          ))}
          {!venue.pastEvents?.length && (
            <p className="text-sm text-gray-600">{getVenueDetailText("noData", locale)}</p>
          )}
        </div>
      </div>
    </section>
  );
}
