"use client";

import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import useProviderDetails from "../hooks/use-provider-details";
import LoadingSkeleton from "../components/detail/loading-skeleton";
import ErrorState from "../components/detail/error-state";
import EmptyState from "../components/detail/empty-state";
import ProviderHero from "../components/detail/provider-hero";
import ProviderSummary from "../components/detail/provider-summary";
import ProviderServices from "../components/detail/provider-services";
import ProviderAvailability from "../components/detail/provider-availability";
import ProviderTrust from "../components/detail/provider-trust";
import StickyProviderCTA from "../components/detail/sticky-provider-cta";

export default function ProviderDetailPage() {
  const { provider, status, error, fetchProvider } = useProviderDetails();

  let content = null;

  if (status === "loading") {
    content = <LoadingSkeleton />;
  } else if (status === "error") {
    const isNotFound = error?.status === 404;
    if (isNotFound) {
      content = <EmptyState />;
    } else {
      content = <ErrorState message={error?.message || error} onRetry={fetchProvider} />;
    }
  } else if (!provider) {
    content = <EmptyState />;
  } else {
    content = (
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <ProviderHero provider={provider} />
          <ProviderSummary provider={provider} />
          <ProviderServices provider={provider} />
          <ProviderAvailability provider={provider} />
          <ProviderTrust provider={provider} />
        </div>
        <StickyProviderCTA provider={provider} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="container mx-auto px-4 pb-24 pt-8">{content}</section>
      <Footer />
    </main>
  );
}
