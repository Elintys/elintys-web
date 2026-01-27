import { formatBoolean } from "../../utils/venue-detail-utils";
import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenueRules({ venue, locale }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">
        {getVenueDetailText("rules", locale)}
      </h2>
      <div className="mt-4 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
          <span>{getVenueDetailText("alcohol", locale)}</span>
          <span>{formatBoolean(venue.rules?.alcoholAllowed, locale)}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
          <span>{getVenueDetailText("noise", locale)}</span>
          <span>{venue.rules?.noiseLimit ?? getVenueDetailText("noData", locale)}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
          <span>{getVenueDetailText("smoking", locale)}</span>
          <span>{formatBoolean(venue.rules?.smoking, locale)}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
          <span>{getVenueDetailText("cancellation", locale)}</span>
          <span>{venue.rules?.cancellationPolicy ?? getVenueDetailText("noData", locale)}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
          <span>{getVenueDetailText("deposit", locale)}</span>
          <span>{formatBoolean(venue.rules?.depositRequired, locale)}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
          <span>{getVenueDetailText("insurance", locale)}</span>
          <span>{formatBoolean(venue.rules?.insuranceRequired, locale)}</span>
        </div>
      </div>
    </section>
  );
}
