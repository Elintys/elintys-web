import { formatPrice } from "../../utils/venue-detail-utils";
import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenuePricing({ venue, locale }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">
        {getVenueDetailText("pricing", locale)}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("pricingModel", locale)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {venue.pricing?.model || getVenueDetailText("noData", locale)}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("basePrice", locale)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {formatPrice(venue.pricing?.baseAmount, venue.pricing?.currency, locale)}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("minHours", locale)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {venue.pricing?.minimumHours ?? getVenueDetailText("noData", locale)}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("extras", locale)}
          </p>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            {(venue.pricing?.extras || []).map((extra) => (
              <p key={extra.label}>
                {extra.label}: {formatPrice(extra.amount, venue.pricing?.currency, locale)}
              </p>
            ))}
            {!venue.pricing?.extras?.length && (
              <p>{getVenueDetailText("noData", locale)}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
