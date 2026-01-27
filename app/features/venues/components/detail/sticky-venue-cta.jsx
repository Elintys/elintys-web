import Link from "next/link";
import { formatPrice } from "../../utils/venue-detail-utils";
import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function StickyVenueCta({ venue, locale }) {
  return (
    <>
      <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("startingAt", locale)}
          </p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {formatPrice(venue.pricing?.baseAmount, venue.pricing?.currency, locale)}
          </p>
          <p className="text-xs text-gray-500">
            {venue.pricing?.model || getVenueDetailText("noData", locale)}
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href={`/venues/${venue.id}/request`}
              className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              {getVenueDetailText("requestQuote", locale)}
            </Link>
            <Link
              href={`/venues/${venue.id}/availability`}
              className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
            >
              {getVenueDetailText("checkAvailability", locale)}
            </Link>
          </div>
        </div>
      </aside>
      <div className="lg:hidden">
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-400">
                {getVenueDetailText("startingAt", locale)}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {formatPrice(venue.pricing?.baseAmount, venue.pricing?.currency, locale)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/venues/${venue.id}/request`}
                className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
              >
                {getVenueDetailText("requestQuote", locale)}
              </Link>
              <Link
                href={`/venues/${venue.id}/availability`}
                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600"
              >
                {getVenueDetailText("checkAvailability", locale)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
