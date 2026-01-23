"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layout/Navbar";
import { fetchProviders } from "../store/slices/providersSlice";
import Footer from "../components/layout/Footer";

const POPULARITY_THRESHOLD = 50;

const initialFilters = {
  categories: [],
  city: "",
  radius: "",
  date: "",
  minPrice: "",
  maxPrice: "",
  minRating: "",
  isVerified: false,
  pricingModel: "",
  languages: [],
};

const PRICING_MODELS = [
  { value: "HOURLY", label: "Horaire" },
  { value: "FIXED", label: "Forfait fixe" },
  { value: "PACKAGE", label: "Package" },
];

const MIN_RATING_OPTIONS = [
  { value: "1", label: "1+ etoile" },
  { value: "2", label: "2+ etoiles" },
  { value: "3", label: "3+ etoiles" },
  { value: "4", label: "4+ etoiles" },
  { value: "4.5", label: "4.5+ etoiles" },
];

const getProviderId = (provider) =>
  provider?.providerId ||
  provider?.id ||
  provider?._id ||
  provider?.userId ||
  provider?.user?.id;

const getProviderName = (provider) =>
  provider?.name ||
  provider?.companyName ||
  provider?.title ||
  provider?.displayName ||
  provider?.user?.displayName ||
  provider?.user?.name ||
  "Prestataire";

const getProviderCategory = (provider) => {
  const fromServices =
    provider?.services?.find((service) => service?.category)?.category ||
    provider?.services?.[0]?.category;
  return (
    fromServices ||
    provider?.mainCategory ||
    provider?.category ||
    provider?.categories?.[0]
  );
};

const getProviderLocation = (provider) =>
  provider?.location?.city ||
  provider?.city ||
  provider?.city ||
  provider?.user?.city ||
  provider?.location?.label;

const getProviderRating = (provider) => {
  const average =
    provider?.rating?.average ||
    provider?.rating?.avg ||
    provider?.ratingAverage ||
    provider?.averageRating;
  const count =
    provider?.rating?.count ||
    provider?.ratingCount ||
    provider?.reviewsCount ||
    provider?.reviews?.length;
  return {
    average: Number.isFinite(Number(average)) ? Number(average) : null,
    count: Number.isFinite(Number(count)) ? Number(count) : null,
  };
};

const getProviderPricing = (provider) => {
  const amount =
    provider?.startingPrice ||
    provider?.pricing?.startingAt ||
    provider?.pricing?.minPrice ||
    provider?.pricing?.amount ||
    provider?.price?.startingAt ||
    provider?.startingPrice;
  const currency =
    provider?.pricing?.currency ||
    provider?.currency ||
    provider?.price?.currency ||
    provider?.currency;
  return { amount, currency };
};

const getProviderImage = (provider) =>
  provider?.media?.avatar ||
  provider?.media?.images?.[0] ||
  provider?.photoUrl ||
  provider?.avatarUrl ||
  provider?.imageUrl ||
  provider?.logoUrl ||
  provider?.user?.avatarUrl;

const getProviderLanguages = (provider) =>
  provider?.languages || provider?.user?.languages || [];

const getAvailabilityStatus = (provider) =>
  provider?.availability?.isAvailable ||
  provider?.availability?.available ||
  provider?.isAvailable;

// Debounce filter inputs to avoid firing a request on every keystroke.
const useDebouncedValue = (value, delayMs) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
};

// Build filter options from the latest API response.
const extractOptions = (providers) => {
  const categories = new Set();
  const languages = new Set();

  providers.forEach((provider) => {
    if (Array.isArray(provider?.categories)) {
      provider.categories.forEach((category) => category && categories.add(category));
    }
    if (provider?.category) {
      categories.add(provider.category);
    }
    if (Array.isArray(provider?.services)) {
      provider.services.forEach((service) => {
        if (service?.category) categories.add(service.category);
      });
    }
    const providerLanguages = getProviderLanguages(provider);
    if (Array.isArray(providerLanguages)) {
      providerLanguages.forEach((language) => language && languages.add(language));
    }
  });

  return {
    categories: Array.from(categories),
    languages: Array.from(languages),
  };
};

const formatPrice = (amount, currency) => {
  if (amount === null || amount === undefined) return null;
  if (currency) {
    try {
      return new Intl.NumberFormat("fr-CA", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (error) {
      return `${amount} ${currency}`;
    }
  }
  return String(amount);
};

const ListingHeader = ({ title, subtitle, totalCount, viewMode, onViewChange }) => (
  <section className="bg-white border-b border-gray-100">
    <div className="container mx-auto px-4 py-8 space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Catalogue
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-gray-600">
            {totalCount} prestataire{totalCount > 1 ? "s" : ""} disponible
            {totalCount > 1 ? "s" : ""}
          </div>
          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              className={`rounded-full px-4 py-1 text-sm ${
                viewMode === "grid"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Grille
            </button>
            <button
              type="button"
              onClick={() => onViewChange("list")}
              className={`rounded-full px-4 py-1 text-sm ${
                viewMode === "list"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Liste
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FilterSection = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
    {children}
  </div>
);

const MultiSelectList = ({
  options,
  selected,
  onToggle,
  emptyLabel,
}) => {
  if (!options.length) {
    return <p className="text-xs text-gray-400">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              isActive
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

const FiltersBar = ({
  filters,
  options,
  activeCount,
  onChange,
  onToggleCategory,
  onToggleLanguage,
  onReset,
}) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Filtres</p>
        <p className="text-sm text-gray-600">{activeCount} actif(s)</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
      >
        Reinitialiser
      </button>
    </div>

    <FilterSection title="Categories de service">
      <MultiSelectList
        options={options.categories}
        selected={filters.categories}
        onToggle={onToggleCategory}
        emptyLabel="Aucune categorie disponible."
      />
    </FilterSection>

    <FilterSection title="Localisation">
      <div className="space-y-3">
        <input
          type="text"
          value={filters.city}
          onChange={(event) => onChange("city", event.target.value)}
          placeholder="Ville"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            value={filters.radius}
            onChange={(event) => onChange("radius", event.target.value)}
            placeholder="Rayon (km)"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </FilterSection>

    <FilterSection title="Date de disponibilite">
      <input
        type="date"
        value={filters.date}
        onChange={(event) => onChange("date", event.target.value)}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
      />
    </FilterSection>

    <FilterSection title="Fourchette de prix">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          min="0"
          value={filters.minPrice}
          onChange={(event) => onChange("minPrice", event.target.value)}
          placeholder="Min"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
        <input
          type="number"
          min="0"
          value={filters.maxPrice}
          onChange={(event) => onChange("maxPrice", event.target.value)}
          placeholder="Max"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </div>
    </FilterSection>

    <FilterSection title="Note minimale">
      <select
        value={filters.minRating}
        onChange={(event) => onChange("minRating", event.target.value)}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
      >
        <option value="">Toutes</option>
        {MIN_RATING_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FilterSection>

    <FilterSection title="Prestataire verifie">
      <label className="flex items-center gap-3 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={filters.isVerified}
          onChange={(event) => onChange("isVerified", event.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600"
        />
        Afficher uniquement les verifies
      </label>
    </FilterSection>

    <FilterSection title="Type de tarification">
      <select
        value={filters.pricingModel}
        onChange={(event) => onChange("pricingModel", event.target.value)}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
      >
        <option value="">Tous</option>
        {PRICING_MODELS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FilterSection>

    <FilterSection title="Langues parlees">
      <MultiSelectList
        options={options.languages}
        selected={filters.languages}
        onToggle={onToggleLanguage}
        emptyLabel="Aucune langue disponible."
      />
    </FilterSection>
  </div>
);

const ProviderCard = ({
  provider,
  viewMode,
  isSelected,
  onToggleCompare,
}) => {
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
  const formattedPrice = formatPrice(pricing.amount, pricing.currency);

  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md ${
        viewMode === "list" ? "flex flex-col gap-4 p-5 md:flex-row" : "p-5"
      }`}
    >
      <Link
        href={`/providers/${providerId}`}
        className={`block ${
          viewMode === "list" ? "md:w-56 flex-shrink-0" : ""
        }`}
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
            {location && (
              <p className="text-xs text-gray-400">Zone: {location}</p>
            )}
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

const ProviderCardMemo = memo(ProviderCard);

const LoadingSkeleton = ({ viewMode }) => (
  <div
    className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ${
      viewMode === "list" ? "flex flex-col gap-4 md:flex-row" : ""
    }`}
  >
    <div className="h-40 w-full rounded-xl bg-slate-100 animate-pulse md:w-56" />
    <div className="flex flex-1 flex-col gap-3">
      <div className="h-5 w-2/3 rounded bg-slate-100 animate-pulse" />
      <div className="h-4 w-1/2 rounded bg-slate-100 animate-pulse" />
      <div className="h-4 w-1/3 rounded bg-slate-100 animate-pulse" />
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-full bg-slate-100 animate-pulse" />
        <div className="h-6 w-20 rounded-full bg-slate-100 animate-pulse" />
      </div>
      <div className="h-8 w-36 rounded-full bg-slate-100 animate-pulse" />
    </div>
  </div>
);

const EmptyState = ({ hasDateFilter }) => (
  <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center">
    <h3 className="text-lg font-semibold text-gray-900">
      Aucun prestataire disponible
    </h3>
    <p className="mt-2 text-sm text-gray-500">
      {hasDateFilter
        ? "Aucun prestataire disponible a la date choisie."
        : "Essayez d'ajuster vos filtres pour elargir la recherche."}
    </p>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
    <p className="text-sm text-red-600">
      {message || "Une erreur est survenue lors du chargement."}
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-4 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
    >
      Reessayer
    </button>
  </div>
);

const ProvidersResults = ({
  status,
  error,
  providers,
  viewMode,
  hasDateFilter,
  comparison,
  onToggleCompare,
  onRetry,
}) => {
  if (status === "loading") {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={`skeleton-${index}`} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!providers.length) {
    return <EmptyState hasDateFilter={hasDateFilter} />;
  }

  return (
    <div
      className={`grid gap-4 ${
        viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : ""
      }`}
    >
      {providers.map((provider, index) => {
        const providerId = getProviderId(provider);
        return (
          <ProviderCardMemo
            key={providerId || `provider-${index}`}
            provider={provider}
            viewMode={viewMode}
            isSelected={Boolean(comparison[providerId])}
            onToggleCompare={onToggleCompare}
          />
        );
      })}
    </div>
  );
};

const Pagination = ({ page, total, limit, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(
    Math.max(0, page - 3),
    page + 2
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 disabled:opacity-50"
      >
        Precedent
      </button>
      {pages.map((pageNumber) => (
        <button
          key={`page-${pageNumber}`}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`h-8 w-8 rounded-full text-xs font-semibold ${
            pageNumber === page
              ? "bg-indigo-600 text-white"
              : "border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
};

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
          const formattedPrice = formatPrice(pricing.amount, pricing.currency);
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

export default function ProvidersListingPage() {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers.list);
  const providersStatus = useSelector((state) => state.providers.status);
  const providersError = useSelector((state) => state.providers.error);
  const meta = useSelector((state) => state.providers.meta);
  const [filters, setFilters] = useState(initialFilters);
  const [viewMode, setViewMode] = useState("grid");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [comparison, setComparison] = useState({});

  const debouncedFilters = useDebouncedValue(filters, 400);
  const debouncedPage = useDebouncedValue(page, 200);

  // Optional: slug-based filters removed to avoid route conflicts.

  const queryParams = useMemo(() => {
    const paramsObject = {
      page: debouncedPage,
      limit: meta.limit,
    };

    if (debouncedFilters.categories.length) {
      paramsObject.category = debouncedFilters.categories.join(",");
    }
    if (debouncedFilters.city) {
      paramsObject.city = debouncedFilters.city;
    }
    if (debouncedFilters.radius) {
      paramsObject.radius = debouncedFilters.radius;
    }
    if (debouncedFilters.date) {
      paramsObject.date = debouncedFilters.date;
    }
    if (debouncedFilters.minPrice) {
      paramsObject.minPrice = debouncedFilters.minPrice;
    }
    if (debouncedFilters.maxPrice) {
      paramsObject.maxPrice = debouncedFilters.maxPrice;
    }
    if (debouncedFilters.minRating) {
      paramsObject.minRating = debouncedFilters.minRating;
    }
    if (debouncedFilters.isVerified) {
      paramsObject.isVerified = true;
    }
    if (debouncedFilters.pricingModel) {
      paramsObject.pricingModel = debouncedFilters.pricingModel;
    }
    if (debouncedFilters.languages.length) {
      paramsObject.languages = debouncedFilters.languages.join(",");
    }

    return paramsObject;
  }, [debouncedFilters, debouncedPage, meta.limit]);

  useEffect(() => {
    dispatch(fetchProviders(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    if (meta?.page) {
      setPage(meta.page);
    }
  }, [meta?.page]);

  const options = useMemo(() => extractOptions(providers), [providers]);

  const title = useMemo(() => {
    const categoryLabel = filters.categories[0];
    const cityLabel = filters.city;
    if (categoryLabel && cityLabel) {
      return `${categoryLabel} a ${cityLabel}`;
    }
    if (categoryLabel) {
      return `Prestataires ${categoryLabel}`;
    }
    if (cityLabel) {
      return `Prestataires evenementiels a ${cityLabel}`;
    }
    return "Prestataires evenementiels";
  }, [filters.categories, filters.city]);

  const subtitle = useMemo(() => {
    const categories =
      options.categories.length > 0 ? options.categories : filters.categories;
    if (!categories.length) {
      return "Decouvrez des experts adaptes a votre evenement.";
    }
    const preview = categories.slice(0, 4).join(" · ");
    const remaining = categories.length - 4;
    return remaining > 0 ? `${preview} +${remaining}` : preview;
  }, [options.categories, filters.categories]);

  const handleFilterChange = useCallback((field, value) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }));
    setPage(1);
  }, []);

  const handleToggleCategory = useCallback((category) => {
    setFilters((current) => {
      const isActive = current.categories.includes(category);
      return {
        ...current,
        categories: isActive
          ? current.categories.filter((item) => item !== category)
          : [...current.categories, category],
      };
    });
    setPage(1);
  }, []);

  const handleToggleLanguage = useCallback((language) => {
    setFilters((current) => {
      const isActive = current.languages.includes(language);
      return {
        ...current,
        languages: isActive
          ? current.languages.filter((item) => item !== language)
          : [...current.languages, language],
      };
    });
    setPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
    setPage(1);
  }, []);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length) count += 1;
    if (filters.city) count += 1;
    if (filters.radius) count += 1;
    if (filters.date) count += 1;
    if (filters.minPrice || filters.maxPrice) count += 1;
    if (filters.minRating) count += 1;
    if (filters.isVerified) count += 1;
    if (filters.pricingModel) count += 1;
    if (filters.languages.length) count += 1;
    return count;
  }, [filters]);

  const handlePageChange = useCallback((nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleRetry = useCallback(() => {
    dispatch(fetchProviders(queryParams));
  }, [dispatch, queryParams]);

  const handleToggleCompare = useCallback((provider) => {
    const providerId = getProviderId(provider);
    if (!providerId) return;
    setComparison((current) => {
      const updated = { ...current };
      if (updated[providerId]) {
        delete updated[providerId];
      } else {
        updated[providerId] = provider;
      }
      return updated;
    });
  }, []);

  const handleClearComparison = useCallback(() => {
    setComparison({});
  }, []);

  const handleRemoveComparison = useCallback((provider) => {
    const providerId = getProviderId(provider);
    if (!providerId) return;
    setComparison((current) => {
      const updated = { ...current };
      delete updated[providerId];
      return updated;
    });
  }, []);

  const selectedProviders = useMemo(
    () => Object.values(comparison),
    [comparison]
  );

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <ListingHeader
        title={title}
        subtitle={subtitle}
        totalCount={meta.total}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FiltersBar
                filters={filters}
                options={options}
                activeCount={activeCount}
                onChange={handleFilterChange}
                onToggleCategory={handleToggleCategory}
                onToggleLanguage={handleToggleLanguage}
                onReset={handleReset}
              />
            </div>
          </aside>

          <div className="space-y-6">
            <ComparisonStrip
              providers={selectedProviders}
              onClear={handleClearComparison}
              onRemove={handleRemoveComparison}
            />

            <ProvidersResults
              status={
                providersStatus === "idle"
                  ? "loading"
                  : providersStatus === "failed"
                  ? "error"
                  : providersStatus
              }
              error={providersError}
              providers={providers}
              viewMode={viewMode}
              hasDateFilter={Boolean(filters.date)}
              comparison={comparison}
              onToggleCompare={handleToggleCompare}
              onRetry={handleRetry}
            />

            <Pagination
              page={meta.page}
              total={meta.total}
              limit={meta.limit}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsFiltersOpen(true)}
          className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          Filtres ({activeCount})
        </button>
      </div>

      {isFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 p-4 lg:hidden">
          <div className="w-full rounded-3xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Filtres</p>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Fermer
              </button>
            </div>
            <div className="mt-4 max-h-[70vh] overflow-y-auto">
              <FiltersBar
                filters={filters}
                options={options}
                activeCount={activeCount}
                onChange={handleFilterChange}
                onToggleCategory={handleToggleCategory}
                onToggleLanguage={handleToggleLanguage}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
