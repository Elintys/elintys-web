"use client";

import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import useVenueDetails from "../hooks/use-venue-details";
import VenueHero from "../components/detail/venue-hero";
import VenueSummary from "../components/detail/venue-summary";
import VenueAbout from "../components/detail/venue-about";
import VenueAmenities from "../components/detail/venue-amenities";
import VenuePricing from "../components/detail/venue-pricing";
import VenueAvailability from "../components/detail/venue-availability";
import VenueRules from "../components/detail/venue-rules";
import VenueReviews from "../components/detail/venue-reviews";
import VenueElintysSections from "../components/detail/venue-elintys-sections";
import VenueFinalCta from "../components/detail/venue-final-cta";
import StickyVenueCta from "../components/detail/sticky-venue-cta";
import VenueNotFound from "../components/detail/venue-not-found";

export default function VenueDetailPage() {
  const { venue, locale, jsonLd, isLoading, isNotFound } = useVenueDetails();

  if (isLoading) {
    const loadingLabel = locale === "fr" ? "Chargement..." : "Loading...";
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <section className="container mx-auto px-4 py-16">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">{loadingLabel}</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (isNotFound) {
    return <VenueNotFound locale={locale} />;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="container mx-auto px-4 pb-24 pt-8">
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <VenueHero venue={venue} locale={locale} />
            <VenueSummary venue={venue} locale={locale} />
            <VenueAbout venue={venue} locale={locale} />
            <VenueAmenities venue={venue} locale={locale} />
            <VenuePricing venue={venue} locale={locale} />
            <VenueAvailability venue={venue} locale={locale} />
            <VenueRules venue={venue} locale={locale} />
            <VenueReviews venue={venue} locale={locale} />
            <VenueElintysSections venue={venue} locale={locale} />
            <VenueFinalCta venue={venue} locale={locale} />
          </div>
          <StickyVenueCta venue={venue} locale={locale} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
