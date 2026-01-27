import VenueCard from "./venue-card";
import VenueListCard from "./venue-list-card";
import LoadingSkeleton from "./loading-skeleton";

export default function VenueResults({ status, error, venues, viewMode, t }) {
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
    const errorMessage =
      typeof error === "string"
        ? error
        : error?.message || t("venues.results.errorDescription");
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-600">{t("venues.results.errorTitle")}</p>
        <p className="mt-2 text-xs text-red-500">{errorMessage}</p>
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
}
