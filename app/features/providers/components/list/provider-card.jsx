import Link from "next/link";
import { POPULARITY_THRESHOLD } from "../../utils/provider-filters";
import {
  getAvailabilityStatus,
  getProviderCategory,
  getProviderId,
  getProviderImage,
  getProviderLocation,
  getProviderName,
  getProviderPricing,
  getProviderRating,
} from "../../utils/provider-helpers";
import { formatListPrice } from "../../utils/provider-formatters";

const ProviderCard = ({ provider, viewMode, isSelected, onToggleCompare }) => {
  const providerId = getProviderId(provider);
  const providerName = getProviderName(provider);
  const category = getProviderCategory(provider);
  const location = getProviderLocation(provider);
  const rating = getProviderRating(provider);
  const pricing = getProviderPricing(provider);
  const image = getProviderImage(provider);
  const isVerified = provider?.isVerified || provider?.user?.isVerified;
  const isAvailable = getAvailabilityStatus(provider);
  const isPopular =
    Number.isFinite(rating.count) && rating.count >= POPULARITY_THRESHOLD;
  const formattedPrice = formatListPrice(pricing.amount, pricing.currency);

  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md ${
        viewMode === "list" ? "flex flex-col gap-4 p-5 md:flex-row" : "p-5"
      }`}
    >
      <Link
        href={`/providers/${providerId}`}
        className={`block ${viewMode === "list" ? "md:w-56 flex-shrink-0" : ""}`}
      >
        <div className="relative h-40 w-full overflow-hidden rounded-xl bg-slate-100">
          {image ? (
            <img
              src={image}
              alt={providerName}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              Aucun visuel
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <Link
              href={`/providers/${providerId}`}
              className="text-lg font-semibold text-gray-900 hover:text-indigo-600"
            >
              {providerName}
            </Link>
            {category && <p className="text-sm text-gray-500">{category}</p>}
            {location && <p className="text-xs text-gray-400">Zone: {location}</p>}
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleCompare(provider)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600"
            />
            Comparer
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          {isVerified && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
              Verifie
            </span>
          )}
          {isAvailable && (
            <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">
              Disponible
            </span>
          )}
          {isPopular && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              Populaire
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {rating.average !== null && (
            <span>
              {rating.average.toFixed(1)} / 5
              {rating.count !== null && ` (${rating.count} avis)`}
            </span>
          )}
          {formattedPrice && (
            <span className="text-gray-800">
              A partir de <strong>{formattedPrice}</strong>
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/providers/${providerId}`}
            className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
          >
            Voir le profil
          </Link>
          <Link
            href={`/providers/${providerId}/quote`}
            className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            Contacter
          </Link>
          <Link
            href={`/providers/${providerId}/booking`}
            className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
          >
            Reserver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
