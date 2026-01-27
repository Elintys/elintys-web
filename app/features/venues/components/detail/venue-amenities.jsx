import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenueAmenities({ venue, locale }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">
        {getVenueDetailText("amenities", locale)}
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(venue.amenities || []).map((item, index) => {
          const label = typeof item === "string" ? item : item?.label || item?.code || "";
          const included = typeof item === "string" ? true : item?.included !== false;
          return (
            <div
              key={`${label || "amenity"}-${included}-${index}`}
              className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 text-sm text-gray-600"
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    included ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {included ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                      <path d="M9.55 16.2L5.7 12.35l1.4-1.4 2.45 2.45 7.25-7.25 1.4 1.4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                      <path d="M12 5.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5h-4.75v4.75a.75.75 0 0 1-1.5 0v-4.75H6.5a.75.75 0 0 1 0-1.5h4.75V6.5a.75.75 0 0 1 .75-.75z" />
                    </svg>
                  )}
                </span>
                {label || getVenueDetailText("noData", locale)}
              </span>
              <span className="text-xs text-gray-400">
                {included
                  ? getVenueDetailText("included", locale)
                  : getVenueDetailText("extra", locale)}
              </span>
            </div>
          );
        })}
        {!venue.amenities?.length && (
          <p className="text-sm text-gray-600">
            {getVenueDetailText("noData", locale)}
          </p>
        )}
      </div>
    </section>
  );
}
