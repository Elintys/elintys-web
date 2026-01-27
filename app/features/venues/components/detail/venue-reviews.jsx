import { formatRating } from "../../utils/venue-detail-utils";
import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenueReviews({ venue, locale }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-900">
          {getVenueDetailText("reviews", locale)}
        </h2>
        <p className="text-sm text-gray-500">{formatRating(venue.rating, locale)}</p>
      </div>
      <div className="mt-4 grid gap-4">
        {(venue.reviews || []).map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-gray-100 bg-slate-50 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
              <span>{review.eventType || getVenueDetailText("noData", locale)}</span>
              <span>{review.rating}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
            {review.isVerified && (
              <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                {getVenueDetailText("verifiedReview", locale)}
              </span>
            )}
          </div>
        ))}
        {!venue.reviews?.length && (
          <p className="text-sm text-gray-600">{getVenueDetailText("noData", locale)}</p>
        )}
      </div>
    </section>
  );
}
