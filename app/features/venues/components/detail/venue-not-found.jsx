import Link from "next/link";
import Navbar from "../../../../components/layout/navbar";
import Footer from "../../../../components/layout/footer";
import { getVenueDetailText } from "../../utils/venue-detail-copy";

export default function VenueNotFound({ locale }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            {getVenueDetailText("notFoundTitle", locale)}
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            {getVenueDetailText("notFoundText", locale)}
          </p>
          <Link
            href="/venues"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            {getVenueDetailText("backToListing", locale)}
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
