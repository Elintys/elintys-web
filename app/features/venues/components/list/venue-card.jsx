import Link from "next/link";
import { CheckBadgeIcon, MapPinIcon, StarIcon, UsersIcon } from "@heroicons/react/24/solid";
import { WifiIcon, MusicalNoteIcon, TruckIcon, SparklesIcon } from "@heroicons/react/24/outline";
import T from "../../../../i18n/t";
import VenueFavoriteButton from "./venue-favorite-button";

const AMENITY_ICONS = {
  WIFI: WifiIcon,
  STAGE: MusicalNoteIcon,
  PARKING: TruckIcon,
  CATERING: SparklesIcon,
  ACCESSIBILITY: SparklesIcon,
};

const AMENITY_LABELS = {
  WIFI: "venues.amenities.wifi",
  STAGE: "venues.amenities.stage",
  PARKING: "venues.amenities.parking",
  CATERING: "venues.amenities.catering",
  ACCESSIBILITY: "venues.amenities.accessibility",
};

const formatPrice = (pricing) => {
  if (!pricing || pricing.baseAmount == null) {
    return null;
  }
  const amount = Number(pricing.baseAmount);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount.toLocaleString();
};

export default function VenueCard({ venue, priorityImage = false }) {
  const venueId = venue?.id || venue?._id || "";
  const imageUrl = venue?.mainImage || "/images/image.png";
  const price = formatPrice(venue?.pricing);
  const ratingAverage = Number(venue?.rating?.average || 0);
  const ratingCount = Number(venue?.rating?.count || 0);
  const amenities = Array.isArray(venue?.amenities) ? venue.amenities : [];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/venues/${venueId}`}
        className="absolute inset-0 z-10"
        aria-label={venue?.title}
      />
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={venue?.title || ""}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading={priorityImage ? "eager" : "lazy"}
          fetchPriority={priorityImage ? "high" : "auto"}
        />
        {venue?.isVerified ? (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-emerald-600/95 px-3 py-1 text-xs font-semibold text-white shadow">
            <CheckBadgeIcon className="h-4 w-4" />
            <T k="venues.card.verified" />
          </span>
        ) : null}
      </div>
      <div className="relative z-0 flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">                                                                                                                                                                  
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{venue?.title}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <MapPinIcon className="h-4 w-4 text-slate-400" />
              {venue?.city}
            </p>
          </div>
          <VenueFavoriteButton venueId={venueId} />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-slate-400" />
            {venue?.capacityMax || "-"}
            <span className="text-slate-400">/</span>
            <T k="venues.card.capacity" />
          </span>
          <span className="flex items-center gap-2">
            <StarIcon className="h-4 w-4 text-amber-400" />
            {ratingAverage.toFixed(1)}
            <span className="text-slate-400">({ratingCount})</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 4).map((amenity) => {
            const Icon = AMENITY_ICONS[amenity] || SparklesIcon;
            const labelKey = AMENITY_LABELS[amenity] || "venues.amenities.other";
            return (
              <span
                key={amenity}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                <Icon className="h-4 w-4" />
                <T k={labelKey} />
              </span>
            );
          })}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            {price ? (
              <p className="text-base font-semibold text-slate-900">
                <T k="venues.card.priceFrom" /> {price}
              </p>
            ) : (
              <p className="text-base font-semibold text-slate-900">
                <T k="venues.card.priceOnRequest" />
              </p>
            )}
          </div>
          <span className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition group-hover:border-slate-300 group-hover:text-slate-900">
            <T k="venues.card.viewVenue" />
          </span>
        </div>
      </div>
    </article>
  );
}
