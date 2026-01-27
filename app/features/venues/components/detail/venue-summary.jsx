import { formatPrice } from "../../utils/venue-detail-utils";
import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenueSummary({ venue, locale }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">
        {getVenueDetailText("quickSummary", locale)}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("address", locale)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {venue.location?.address || getVenueDetailText("noData", locale)}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("capacities", locale)}
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>
              {getVenueDetailText("seated", locale)}: {venue.capacity?.seated ?? getVenueDetailText("noData", locale)}
            </p>
            <p>
              {getVenueDetailText("standing", locale)}: {venue.capacity?.standing ?? getVenueDetailText("noData", locale)}
            </p>
            <p>
              {getVenueDetailText("banquet", locale)}: {venue.capacity?.banquet ?? getVenueDetailText("noData", locale)}
            </p>
            <p>
              {getVenueDetailText("conference", locale)}: {venue.capacity?.conference ?? getVenueDetailText("noData", locale)}
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("allowedEvents", locale)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {venue.eventTypes?.length
              ? venue.eventTypes.join(", ")
              : getVenueDetailText("noData", locale)}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("startingAt", locale)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {formatPrice(venue.pricing?.baseAmount, venue.pricing?.currency, locale)}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("badge", locale)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {venue.isVerified
              ? getVenueDetailText("verified", locale)
              : getVenueDetailText("noData", locale)}
          </p>
        </div>
      </div>
    </section>
  );
}
