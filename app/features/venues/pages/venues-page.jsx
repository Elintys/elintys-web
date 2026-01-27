"use client";

import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import FiltersPanel from "../components/list/filters-panel";
import VenuesHeader from "../components/list/venues-header";
import VenueResults from "../components/list/venue-results";
import PaginationControls from "../components/list/pagination-controls";
import useVenuesList from "../hooks/use-venues-list";
import { AMENITIES, EVENT_TYPES, SORT_OPTIONS } from "../utils/venue-filters";
import { useLanguage } from "../../../i18n/language-provider";

export default function VenuesPage() {
  const { t } = useLanguage();
  const {
    filters,
    list,
    meta,
    listStatus,
    error,
    viewMode,
    setViewMode,
    isFiltersOpen,
    setIsFiltersOpen,
    totalCount,
    countLabel,
    handlePageChange,
  } = useVenuesList(t);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <VenuesHeader
        filters={filters}
        t={t}
        totalCount={totalCount}
        countLabel={countLabel}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

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

            <PaginationControls
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
