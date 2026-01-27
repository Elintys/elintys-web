import Link from "next/link";
import HeroGallery from "./hero-gallery";
import { formatRating } from "../../utils/venue-detail-utils";
import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenueHero({ venue, locale }) {
  return (
    <section className="space-y-6">
      <HeroGallery images={venue.media?.images} title={venue.name || venue.title} />
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
              {getVenueDetailText("heroTag", locale)}
            </p>
            <h1 className="text-3xl font-semibold text-gray-900">
              {venue.name || venue.title}
            </h1>
            <p className="text-sm text-gray-500">
              {venue.location?.city || getVenueDetailText("noData", locale)} ·{" "}
              {venue.location?.country || getVenueDetailText("noData", locale)}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span>
                {getVenueDetailText("maxCapacity", locale)}:{" "}
                {venue.capacity?.max || getVenueDetailText("noData", locale)}
              </span>
              <span>{formatRating(venue.rating, locale)}</span>
            </div>
          </div>
          {venue.isVerified && (
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
              {getVenueDetailText("verified", locale)}
            </span>
          )}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href={`/venues/${venue.id}/request`}
            className="rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            {getVenueDetailText("requestQuote", locale)}
          </Link>
          <Link
            href={`/venues/${venue.id}/availability`}
            className="rounded-full border border-gray-200 px-5 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
          >
            {getVenueDetailText("checkAvailability", locale)}
          </Link>
        </div>
      </div>
    </section>
  );
}
