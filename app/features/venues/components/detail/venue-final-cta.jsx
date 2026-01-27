import Link from "next/link";
import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenueFinalCta({ venue, locale }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {getVenueDetailText("finalCtaTitle", locale)}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {getVenueDetailText("finalCtaText", locale)}
          </p>
        </div>
        <Link
          href={`/venues/${venue.id}/contact`}
          className="rounded-full bg-gray-900 px-5 py-2 text-xs font-semibold text-white hover:bg-gray-800"
        >
          {getVenueDetailText("contactOwner", locale)}
        </Link>
      </div>
    </section>
  );
}
