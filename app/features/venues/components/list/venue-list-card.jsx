import Link from "next/link";
import { POPULARITY_THRESHOLD } from "../../utils/venue-filters";

export default function VenueListCard({ venue, t }) {
  const venueId = venue?.id || venue?._id || "";
  const imageUrl = venue?.mainImage || "/images/image.png";
  const ratingAverage = Number(venue?.rating?.average || 0);
  const ratingCount = Number(venue?.rating?.count || 0);
  const isPopular =
    Number.isFinite(ratingCount) && ratingCount >= POPULARITY_THRESHOLD;
  const priceAmount = venue?.pricing?.baseAmount;
  const priceLabel =
    priceAmount == null ? null : Number(priceAmount).toLocaleString();

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 p-5 md:flex-row">
        <div className="md:w-56 flex-shrink-0">
          <div className="relative h-40 w-full overflow-hidden rounded-xl bg-slate-100">
            <img
              src={imageUrl}
              alt={venue?.title || ""}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <p className="text-lg font-semibold text-gray-900">{venue?.title}</p>
            <p className="text-sm text-gray-500">
              {venue?.city || "-"} · {venue?.capacityMax || "-"} pers
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            {venue?.isVerified && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                {t("venues.card.verified")}
              </span>
            )}
            {isPopular && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                {t("venues.list.popularBadge")}
              </span>
            )}
            <span>
              {ratingAverage.toFixed(1)} ({ratingCount})
            </span>
            {priceLabel && (
              <span className="text-gray-800">
                {t("venues.card.priceFrom")} <strong>{priceLabel}</strong>
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/venues/${venueId}`}
              className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
            >
              {t("venues.card.viewVenue")}
            </Link>
            <Link
              href={`/venues/${venueId}/request`}
              className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              {t("venues.list.contact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
