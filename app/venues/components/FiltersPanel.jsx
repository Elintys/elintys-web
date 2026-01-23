"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "../../i18n/LanguageProvider";

const toListValue = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim().length) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

const parseFiltersFromParams = (params) => {
  const getValue = (key) => params.get(key) || "";
  return {
    q: getValue("q"),
    city: getValue("city"),
    radius: getValue("radius"),
    capacity: getValue("capacity"),
    minPrice: getValue("minPrice"),
    maxPrice: getValue("maxPrice"),
    eventTypes: toListValue(getValue("eventTypes")),
    amenities: toListValue(getValue("amenities")),
    isVerified: getValue("isVerified") === "true",
    sort: getValue("sort") || "price_asc",
    page: getValue("page") || "1",
    limit: getValue("limit") || "12",
  };
};

export default function FiltersPanel({ initialFilters, eventTypes, amenities, sortOptions }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [filters, setFilters] = useState(() => ({
    ...initialFilters,
    radius: initialFilters.radius ? String(initialFilters.radius) : "",
    capacity: initialFilters.capacity ? String(initialFilters.capacity) : "",
    minPrice: initialFilters.minPrice ? String(initialFilters.minPrice) : "",
    maxPrice: initialFilters.maxPrice ? String(initialFilters.maxPrice) : "",
  }));

  useEffect(() => {
    const next = parseFiltersFromParams(searchParams);
    setFilters((prev) => ({ ...prev, ...next }));
  }, [searchParams]);

  const updateParams = (updates, { resetPage = true } = {}) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value == null || value === false || value.length === 0) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    if (resetPage) {
      params.set("page", "1");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleInputChange = (key) => (event) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, [key]: value }));
    updateParams({ [key]: value });
  };

  const handleToggle = (key) => (event) => {
    const checked = event.target.checked;
    setFilters((prev) => ({ ...prev, [key]: checked }));
    updateParams({ [key]: checked });
  };

  const handleMultiToggle = (key, value) => () => {
    setFilters((prev) => {
      const current = new Set(prev[key]);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }
      const next = Array.from(current);
      updateParams({ [key]: next.join(",") });
      return { ...prev, [key]: next };
    });
  };

  const handleReset = () => {
    router.push("?", { scroll: false });
  };

  const sortLabel = useMemo(() => {
    return sortOptions.find((option) => option.value === filters.sort)?.labelKey;
  }, [filters.sort, sortOptions]);

  return (
    <aside className="space-y-6 lg:sticky lg:top-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">{t("venues.filters.title")}</h2>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold uppercase tracking-wide text-slate-400 hover:text-slate-600"
          >
            {t("venues.filters.reset")}
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            {t("venues.filters.search")}
            <input
              value={filters.q}
              onChange={handleInputChange("q")}
              placeholder={t("venues.filters.searchPlaceholder")}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            {t("venues.filters.city")}
            <input
              value={filters.city}
              onChange={handleInputChange("city")}
              placeholder={t("venues.filters.cityPlaceholder")}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            {t("venues.filters.radius")}
            <select
              value={filters.radius}
              onChange={handleInputChange("radius")}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
            >
              <option value="">{t("venues.filters.radiusAny")}</option>
              <option value="5">5 {t("venues.filters.km")}</option>
              <option value="10">10 {t("venues.filters.km")}</option>
              <option value="25">25 {t("venues.filters.km")}</option>
              <option value="50">50 {t("venues.filters.km")}</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            {t("venues.filters.capacityMin")}
            <select
              value={filters.capacity}
              onChange={handleInputChange("capacity")}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
            >
              <option value="">{t("venues.filters.capacityAny")}</option>
              <option value="20">20+</option>
              <option value="50">50+</option>
              <option value="100">100+</option>
              <option value="250">250+</option>
              <option value="500">500+</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            {t("venues.filters.budgetMax")}
            <input
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={handleInputChange("maxPrice")}
              placeholder={t("venues.filters.budgetPlaceholder")}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700"
            />
          </label>

          <div>
            <p className="text-sm font-semibold text-slate-700">
              {t("venues.filters.eventTypes")}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={handleMultiToggle("eventTypes", type.value)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    filters.eventTypes.includes(type.value)
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
                  }`}
                >
                  {t(type.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700">
              {t("venues.filters.amenities")}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {amenities.map((amenity) => (
                <label
                  key={amenity.value}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                >
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity.value)}
                    onChange={handleMultiToggle("amenities", amenity.value)}
                  />
                  {t(amenity.labelKey)}
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
            {t("venues.filters.verified")}
            <input
              type="checkbox"
              checked={filters.isVerified}
              onChange={handleToggle("isVerified")}
              className="h-4 w-4"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            {t("venues.filters.sort")}
            <select
              value={filters.sort}
              onChange={handleInputChange("sort")}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.labelKey)}
                </option>
              ))}
            </select>
            {sortLabel ? (
              <p className="mt-2 text-xs text-slate-400">
                {t("venues.filters.sortHint")}: {t(sortLabel)}
              </p>
            ) : null}
          </label>
        </div>
      </div>
    </aside>
  );
}
