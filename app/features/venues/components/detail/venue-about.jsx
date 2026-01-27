import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenueAbout({ venue, locale }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">
        {getVenueDetailText("about", locale)}
      </h2>
      <p className="mt-3 text-sm text-gray-600">
        {venue.description || getVenueDetailText("noData", locale)}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("vibe", locale)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {venue.vibe || getVenueDetailText("noData", locale)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {getVenueDetailText("recommendedFor", locale)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {venue.recommendedFor || getVenueDetailText("noData", locale)}
          </p>
        </div>
      </div>
    </section>
  );
}
