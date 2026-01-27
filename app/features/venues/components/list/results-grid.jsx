import T from "../../../../i18n/t";
import VenueCard from "./venue-card";
import Pagination from "./pagination";

export default function ResultsGrid({ venues, meta, error, baseQuery }) {
  if (error) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          <T k="venues.results.errorTitle" />
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          <T k="venues.results.errorDescription" />
        </p>
      </section>
    );
  }

  if (!venues.length) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          <T k="venues.results.emptyTitle" />
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          <T k="venues.results.emptyDescription" />
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            <T k="venues.results.emptyHintOne" />
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            <T k="venues.results.emptyHintTwo" />
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-500">
          <span className="text-base font-semibold text-slate-900">
            {meta.total || venues.length}
          </span>{" "}
          <T k="venues.results.count" />
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          <T k="venues.results.tagline" />
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {venues.map((venue, index) => (
          <VenueCard
            key={venue.id || venue._id || venue.title}
            venue={venue}
            priorityImage={index === 0}
          />
        ))}
      </div>

      <Pagination meta={meta} baseQuery={baseQuery} />
    </section>
  );
}
