"use client";

import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import ListingHeader from "../components/list/listing-header";
import FiltersBar from "../components/list/filters-bar";
import ComparisonStrip from "../components/list/comparison-strip";
import ProvidersResults from "../components/list/providers-results";
import PaginationControls from "../components/list/pagination-controls";
import useProvidersList from "../hooks/use-providers-list";

export default function ProvidersPage() {
  const {
    providers,
    meta,
    providersError,
    providersStatus,
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
  } = useProvidersList();

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
              status={providersStatus}
              error={providersError}
              providers={providers}
              viewMode={viewMode}
              hasDateFilter={Boolean(filters.date)}
              comparison={comparison}
              onToggleCompare={handleToggleCompare}
              onRetry={handleRetry}
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
