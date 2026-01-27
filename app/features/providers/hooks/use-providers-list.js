import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviders } from "../../../store/slices/providersSlice";
import useDebouncedValue from "./use-debounced-value";
import { INITIAL_FILTERS } from "../utils/provider-filters";
import { extractOptions } from "../utils/provider-options";
import { getProviderId } from "../utils/provider-helpers";

export default function useProvidersList() {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers.list);
  const providersStatus = useSelector((state) => state.providers.status);
  const providersError = useSelector((state) => state.providers.error);
  const meta = useSelector((state) => state.providers.meta);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [viewMode, setViewMode] = useState("grid");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [comparison, setComparison] = useState({});

  const debouncedFilters = useDebouncedValue(filters, 400);
  const debouncedPage = useDebouncedValue(page, 200);

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
    setFilters(INITIAL_FILTERS);
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

  const mappedStatus =
    providersStatus === "idle"
      ? "loading"
      : providersStatus === "failed"
      ? "error"
      : providersStatus;

  return {
    providers,
    meta,
    providersError,
    providersStatus: mappedStatus,
    filters,
    viewMode,
    setViewMode,
    isFiltersOpen,
    setIsFiltersOpen,
    options,
    title,
    subtitle,
    activeCount,
    comparison,
    selectedProviders,
    handleFilterChange,
    handleToggleCategory,
    handleToggleLanguage,
    handleReset,
    handlePageChange,
    handleRetry,
    handleToggleCompare,
    handleClearComparison,
    handleRemoveComparison,
  };
}
