import {
  getProviderCategory,
  getProviderId,
  getProviderLocation,
  getProviderName,
  getProviderPricing,
  getProviderRating,
} from "../../utils/provider-helpers";
import { formatListPrice } from "../../utils/provider-formatters";

const ComparisonStrip = ({ providers, onClear, onRemove }) => {
  if (!providers.length) return null;

  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-400">
            Comparaison visuelle
          </p>
          <p className="text-sm text-indigo-700">
            {providers.length} prestataire{providers.length > 1 ? "s" : ""} selectionne
            {providers.length > 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Vider la comparaison
        </button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {providers.map((provider) => {
          const providerId = getProviderId(provider);
          const rating = getProviderRating(provider);
          const pricing = getProviderPricing(provider);
          const formattedPrice = formatListPrice(pricing.amount, pricing.currency);
          return (
            <div
              key={`compare-${providerId}`}
              className="rounded-xl border border-white bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {getProviderName(provider)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getProviderCategory(provider) || "Categorie non renseignee"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(provider)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Retirer
                </button>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                {getProviderLocation(provider) && (
                  <p>Zone: {getProviderLocation(provider)}</p>
                )}
                {rating.average !== null && (
                  <p>
                    Note: {rating.average.toFixed(1)}
                    {rating.count !== null && ` (${rating.count} avis)`}
                  </p>
                )}
                {formattedPrice && <p>Prix: {formattedPrice}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparisonStrip;
