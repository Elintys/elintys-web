"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FiltersPanel from "./components/FiltersPanel";
import VenueCard from "./components/VenueCard";
import { buildVenueQuery } from "./lib/venues";
import { fetchVenues } from "../store/slices/venuesSlice";
import { useLanguage } from "../i18n/LanguageProvider";

const POPULARITY_THRESHOLD = 50;

const EVENT_TYPES = [
  { value: "WEDDING", labelKey: "venues.eventTypes.wedding" },
  { value: "CORPORATE", labelKey: "venues.eventTypes.corporate" },
  { value: "BIRTHDAY", labelKey: "venues.eventTypes.birthday" },
  { value: "CONCERT", labelKey: "venues.eventTypes.concert" },
  { value: "EXHIBITION", labelKey: "venues.eventTypes.exhibition" },
];

const AMENITIES = [
  { value: "WIFI", labelKey: "venues.amenities.wifi" },
  { value: "PARKING", labelKey: "venues.amenities.parking" },
  { value: "STAGE", labelKey: "venues.amenities.stage" },
  { value: "CATERING", labelKey: "venues.amenities.catering" },
  { value: "ACCESSIBILITY", labelKey: "venues.amenities.accessibility" },
];

const SORT_OPTIONS = [
  { value: "price_asc", labelKey: "venues.sort.priceAsc" },
  { value: "capacity_desc", labelKey: "venues.sort.capacityDesc" },
  { value: "rating_desc", labelKey: "venues.sort.ratingDesc" },
];

const buildParamsObject = (searchParams) => {
  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export default function VenuesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const paramsObject = useMemo(() => buildParamsObject(searchParams), [searchKey]);
  const { filters, queryParams } = useMemo(
    () => buildVenueQuery(paramsObject),
    [paramsObject]
  );

  const dispatch = useDispatch();
  const { list, meta, listStatus, listError } = useSelector((state) => state.venues);
  const [viewMode, setViewMode] = useState("grid");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const requestParams = Object.fromEntries(queryParams.entries());
    dispatch(fetchVenues(requestParams));
  }, [dispatch, queryParams]);

  const title = t("venues.list.title");
  const error = listStatus === "failed" ? listError : null;

  const handlePageChange = useCallback(
    (nextPage) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(nextPage));
      router.push(`?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router, searchParams]
  );

  const totalCount = meta.total || list.length;
  const countLabel =
    totalCount === 1
      ? t("venues.list.countSingular")
      : t("venues.list.countPlural");

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                {t("venues.list.catalogue")}
              </p>
              <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">
                {filters.city ? (
                  <>
                    {t("venues.list.subtitleCityPrefix")} {filters.city}
                  </>
                ) : (
                  t("venues.list.subtitleDefault")
                )}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-gray-600">
                {totalCount} {countLabel}
              </div>
              <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-full px-4 py-1 text-sm ${
                    viewMode === "grid"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t("venues.list.grid")}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`rounded-full px-4 py-1 text-sm ${
                    viewMode === "list"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t("venues.list.list")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FiltersPanel
                initialFilters={filters}
                eventTypes={EVENT_TYPES}
                amenities={AMENITIES}
                sortOptions={SORT_OPTIONS}
              />
            </div>
          </aside>

          <div className="space-y-6">
            <VenueResults
              status={listStatus}
              error={error}
              venues={list}
              viewMode={viewMode}
              t={t}
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
          {t("venues.list.filters")}
        </button>
      </div>

      {isFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 p-4 lg:hidden">
          <div className="w-full rounded-3xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">
                {t("venues.list.filters")}
              </p>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {t("venues.list.close")}
              </button>
            </div>
            <div className="mt-4 max-h-[70vh] overflow-y-auto">
              <FiltersPanel
                initialFilters={filters}
                eventTypes={EVENT_TYPES}
                amenities={AMENITIES}
                sortOptions={SORT_OPTIONS}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

const VenueListCard = ({ venue, t }) => {
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
};

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
    </div>
  </div>
);

const VenueResults = ({ status, error, venues, viewMode, t }) => {
  if (status === "loading" || status === "idle") {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={`skeleton-${index}`} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-600">{t("venues.results.errorTitle")}</p>
        <p className="mt-2 text-xs text-red-500">
          {error || t("venues.results.errorDescription")}
        </p>
      </div>
    );
  }

  if (!venues.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {t("venues.results.emptyTitle")}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {t("venues.results.emptyDescription")}
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="grid gap-4">
        {venues.map((venue, index) => (
          <VenueListCard
            key={venue.id || venue._id || `venue-${index}`}
            venue={venue}
            t={t}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {venues.map((venue, index) => (
        <VenueCard key={venue.id || venue._id || `venue-${index}`} venue={venue} />
      ))}
    </div>
  );
};

const Pagination = ({ page, total, limit, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil((total || 0) / (limit || 12)));

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
