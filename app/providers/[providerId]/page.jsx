"use client";

import { useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { fetchProviderDetails } from "../../store/slices/providersSlice";

/**
 * @typedef {import("../../types/providers").ProviderDetailsDTO} ProviderDetailsDTO
 */

const formatPrice = (amount, currency) => {
  if (amount == null) return "-";
  if (!currency) return String(amount);
  return `${amount} ${currency}`;
};

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-20 w-20 rounded-2xl bg-slate-100 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-2/3 rounded bg-slate-100 animate-pulse" />
          <div className="h-4 w-1/2 rounded bg-slate-100 animate-pulse" />
          <div className="h-4 w-1/3 rounded bg-slate-100 animate-pulse" />
        </div>
      </div>
    </div>
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={`section-skeleton-${index}`}
        className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div className="h-4 w-1/4 rounded bg-slate-100 animate-pulse" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full rounded bg-slate-100 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-slate-100 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-center">
    <p className="text-sm text-red-600">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-4 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
    >
      Reessayer
    </button>
  </div>
);

const EmptyState = () => (
  <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center">
    <h2 className="text-lg font-semibold text-gray-900">Prestataire introuvable</h2>
    <p className="mt-2 text-sm text-gray-500">
      Verifiez l'identifiant ou revenez au listing.
    </p>
    <Link
      href="/providers"
      className="mt-4 inline-flex rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
    >
      Retour aux prestataires
    </Link>
  </div>
);

const ProviderHero = ({ provider }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="h-20 w-20 overflow-hidden rounded-2xl bg-slate-100">
        {provider.avatarUrl ? (
          <img
            src={provider.avatarUrl}
            alt={provider.displayName}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            Aucun visuel
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            {provider.displayName}
          </h1>
          {provider.isVerified && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
              Verifie
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">{provider.mainCategory || "-"}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span>{provider.location?.city || "-"}</span>
          <span>
            {provider.rating?.average ?? "-"} / 5
            {provider.rating?.count ? ` (${provider.rating.count} avis)` : ""}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:items-end">
        <Link
          href={`/providers/${provider.id}/quote`}
          className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
        >
          Demander un devis
        </Link>
        <Link
          href={`/providers/${provider.id}/contact`}
          className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
        >
          Contacter
        </Link>
      </div>
    </div>
  </section>
);

const ProviderSummary = ({ provider }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-semibold text-gray-900">A propos</h2>
    <p className="mt-3 text-sm text-gray-600">
      {provider.description || "Aucune description disponible."}
    </p>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Langues</p>
        <p className="mt-2 text-sm text-gray-600">
          {provider.languages?.length ? provider.languages.join(", ") : "-"}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Tags</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(provider.tags || []).length ? (
            provider.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-600">-</span>
          )}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Evenements realises
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {provider.completedEvents ?? "-"}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Taux de reponse
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {provider.responseRate ?? "-"}
        </p>
      </div>
    </div>
  </section>
);

const ProviderServices = ({ provider }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold text-gray-900">Services</h2>
      <p className="text-xs text-gray-400">
        {provider.services?.length || 0} service(s)
      </p>
    </div>
    <div className="mt-4 grid gap-4">
      {(provider.services || []).map((service) => (
        <div
          key={service.id}
          className="rounded-2xl border border-gray-100 bg-slate-50 p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{service.title}</h3>
              <p className="text-xs text-gray-500">{service.category}</p>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatPrice(service.pricing?.amount, service.pricing?.currency)}
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            {service.description || "Aucune description."}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="rounded-full bg-white px-3 py-1">
              {service.pricing?.model || "-"}
            </span>
            {(service.options || []).map((option) => (
              <span
                key={option.label}
                className="rounded-full border border-gray-200 bg-white px-3 py-1"
              >
                {option.label}: {formatPrice(option.price, service.pricing?.currency)}
              </span>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
          >
            Choisir ce service
          </button>
        </div>
      ))}
      {!provider.services?.length && (
        <p className="text-sm text-gray-500">Aucun service disponible.</p>
      )}
    </div>
  </section>
);

const ProviderAvailability = ({ provider }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-sm font-semibold text-gray-900">Disponibilite</h2>
      <span
        className={`rounded-full px-3 py-1 text-xs ${
          provider.isAvailable
            ? "bg-emerald-50 text-emerald-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {provider.isAvailable ? "Disponible" : "Indisponible"}
      </span>
    </div>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Jours</p>
        <p className="mt-2 text-sm text-gray-600">
          {provider.availability?.days?.length
            ? provider.availability.days.join(", ")
            : "-"}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Horaires</p>
        <p className="mt-2 text-sm text-gray-600">
          {provider.availability?.hours?.from && provider.availability?.hours?.to
            ? `${provider.availability.hours.from} - ${provider.availability.hours.to}`
            : "-"}
        </p>
      </div>
    </div>
  </section>
);

const ProviderTrust = ({ provider }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-semibold text-gray-900">Confiance</h2>
    <div className="mt-4 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>Prestataire verifie</span>
        <span>{provider.isVerified ? "Oui" : "Non"}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>Assurance</span>
        <span>{provider.insuranceProvided ?? "-"}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>Licence</span>
        <span>{provider.licenseProvided ?? "-"}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>Politique d'annulation</span>
        <span>{provider.cancellationPolicy ?? "-"}</span>
      </div>
    </div>
  </section>
);

const StickyProviderCTA = ({ provider }) => (
  <>
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          A partir de
        </p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {formatPrice(provider.startingPrice?.amount, provider.startingPrice?.currency)}
        </p>
        <p className="text-xs text-gray-500">{provider.pricingModel || "-"}</p>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/providers/${provider.id}/quote`}
            className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            Demander un devis
          </Link>
          <Link
            href={`/providers/${provider.id}/contact`}
            className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
          >
            Contacter
          </Link>
        </div>
      </div>
    </aside>
    <div className="lg:hidden">
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">A partir de</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(
                provider.startingPrice?.amount,
                provider.startingPrice?.currency
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/providers/${provider.id}/quote`}
              className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
            >
              Devis
            </Link>
            <Link
              href={`/providers/${provider.id}/contact`}
              className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600"
            >
              Contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default function ProviderDetailsPage() {
  const params = useParams();
  const providerId = params?.providerId;
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.providers.detail);
  const status = useSelector((state) => state.providers.detailStatus);
  const error = useSelector((state) => state.providers.detailError);

  // Fetch provider details via Redux thunk (BFF only).
  const fetchProvider = useCallback(() => {
    if (!providerId) return;
    dispatch(fetchProviderDetails(providerId));
  }, [dispatch, providerId]);

  // Load the provider when the route param changes.
  useEffect(() => {
    fetchProvider();
  }, [fetchProvider]);

  const content = useMemo(() => {
    if (status === "loading") return <LoadingSkeleton />;
    if (status === "error") {
      const isNotFound = error?.status === 404;
      if (isNotFound) return <EmptyState />;
      return <ErrorState message={error?.message || error} onRetry={fetchProvider} />;
    }
    if (!provider) return <EmptyState />;

    return (
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
  }, [status, error, provider, fetchProvider]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="container mx-auto px-4 pb-24 pt-8">{content}</section>
      <Footer />
    </main>
  );
}
