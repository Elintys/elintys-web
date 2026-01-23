"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useLanguage } from "../../i18n/LanguageProvider";
import { fetchVenueById } from "../../store/slices/venuesSlice";

/**
 * @typedef {import("../../types/venues").VenueDetailsDTO} VenueDetailsDTO
 */

const COPY = {
  fr: {
    heroTag: "Lieu evenementiel",
    verified: "Lieu verifie",
    maxCapacity: "Capacite max",
    requestQuote: "Demander un devis",
    checkAvailability: "Verifier la disponibilite",
    quickSummary: "Resume rapide",
    address: "Adresse",
    capacities: "Capacites",
    seated: "Assis",
    standing: "Debout",
    banquet: "Banquet",
    conference: "Conference",
    allowedEvents: "Types d'evenements",
    startingAt: "A partir de",
    about: "A propos du lieu",
    vibe: "Ambiance",
    recommendedFor: "Public recommande",
    amenities: "Equipements & services",
    included: "Inclus",
    extra: "Extra",
    pricing: "Tarification",
    pricingModel: "Modele",
    basePrice: "Prix de base",
    minHours: "Heures minimales",
    extras: "Options",
    availability: "Disponibilites",
    available: "Disponible",
    unavailable: "Indisponible",
    calendarMonth: "Calendrier",
    requestDate: "Faire une demande pour cette date",
    rules: "Reglement & conditions",
    alcohol: "Alcool",
    noise: "Bruit",
    smoking: "Tabac",
    cancellation: "Annulation",
    deposit: "Depot",
    insurance: "Assurance",
    reviews: "Avis",
    verifiedReview: "Avis verifie",
    recommendedProviders: "Prestataires recommandes",
    pastEvents: "Evenements passes",
    view: "Voir",
    finalCtaTitle: "Parlons de votre evenement",
    finalCtaText: "Recevez une reponse rapide et un devis personnalise.",
    contactOwner: "Contacter le proprietaire",
    badge: "Badge",
    noData: "-",
    notFoundTitle: "Lieu introuvable",
    notFoundText: "Verifiez l'identifiant ou revenez au listing.",
    backToListing: "Retour aux lieux",
  },
  en: {
    heroTag: "Event venue",
    verified: "Verified venue",
    maxCapacity: "Max capacity",
    requestQuote: "Request a quote",
    checkAvailability: "Check availability",
    quickSummary: "Quick summary",
    address: "Address",
    capacities: "Capacities",
    seated: "Seated",
    standing: "Standing",
    banquet: "Banquet",
    conference: "Conference",
    allowedEvents: "Allowed events",
    startingAt: "Starting at",
    about: "About the venue",
    vibe: "Vibe",
    recommendedFor: "Recommended for",
    amenities: "Amenities & services",
    included: "Included",
    extra: "Extra",
    pricing: "Pricing",
    pricingModel: "Model",
    basePrice: "Base price",
    minHours: "Minimum hours",
    extras: "Add-ons",
    availability: "Availability",
    available: "Available",
    unavailable: "Unavailable",
    calendarMonth: "Calendar",
    requestDate: "Request this date",
    rules: "Rules & conditions",
    alcohol: "Alcohol",
    noise: "Noise",
    smoking: "Smoking",
    cancellation: "Cancellation",
    deposit: "Deposit",
    insurance: "Insurance",
    reviews: "Reviews",
    verifiedReview: "Verified review",
    recommendedProviders: "Recommended providers",
    pastEvents: "Past events",
    view: "View",
    finalCtaTitle: "Lets plan your event",
    finalCtaText: "Get a fast reply and a tailored quote.",
    contactOwner: "Contact owner",
    badge: "Badge",
    noData: "-",
    notFoundTitle: "Venue not found",
    notFoundText: "Check the id or return to the listing.",
    backToListing: "Back to venues",
  },
};

const t = (key, locale) => COPY[locale]?.[key] || COPY.fr[key] || key;

const formatPrice = (value, currency, locale) => {
  if (value == null) return t("noData", locale);
  if (!currency) return String(value);
  return `${value} ${currency}`;
};

const formatRating = (rating, locale) => {
  if (!rating) return t("noData", locale);
  const average = rating.average ?? t("noData", locale);
  const count = rating.count != null ? `(${rating.count})` : "";
  return `${average} ${count}`.trim();
};

const formatBoolean = (value, locale) => {
  if (value === true) return locale === "fr" ? "Oui" : "Yes";
  if (value === false) return locale === "fr" ? "Non" : "No";
  return t("noData", locale);
};

const formatDate = (value, locale) => {
  if (!value) return t("noData", locale);
  const localeTag = locale === "en" ? "en-US" : "fr-FR";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(localeTag);
};


const HeroGallery = ({ images, title }) => (
  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
    {(images || []).map((src, index) => (
      <div key={`${src}-${index}`} className="min-w-[70%] snap-start">
        <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100">
          <img
            src={src}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    ))}
    {!images?.length && (
      <div className="min-w-[70%] snap-start">
        <div className="aspect-[16/10] rounded-3xl bg-slate-100" />
      </div>
    )}
  </div>
);

const StickyVenueCTA = ({ venue, locale }) => (
  <>
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("startingAt", locale)}
        </p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {formatPrice(venue.pricing?.baseAmount, venue.pricing?.currency, locale)}
        </p>
        <p className="text-xs text-gray-500">{venue.pricing?.model || t("noData", locale)}</p>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/venues/${venue.id}/request`}
            className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            {t("requestQuote", locale)}
          </Link>
          <Link
            href={`/venues/${venue.id}/availability`}
            className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
          >
            {t("checkAvailability", locale)}
          </Link>
        </div>
      </div>
    </aside>
    <div className="lg:hidden">
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">{t("startingAt", locale)}</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(venue.pricing?.baseAmount, venue.pricing?.currency, locale)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/venues/${venue.id}/request`}
              className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
            >
              {t("requestQuote", locale)}
            </Link>
            <Link
              href={`/venues/${venue.id}/availability`}
              className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600"
            >
              {t("checkAvailability", locale)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);

const VenueHero = ({ venue, locale }) => (
  <section className="space-y-6">
    <HeroGallery images={venue.media?.images} title={venue.name || venue.title} />
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {t("heroTag", locale)}
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">
            {venue.name || venue.title}
          </h1>
          <p className="text-sm text-gray-500">
            {venue.location?.city || t("noData", locale)} ·{" "}
            {venue.location?.country || t("noData", locale)}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span>
              {t("maxCapacity", locale)}:{" "}
              {venue.capacity?.max || t("noData", locale)}
            </span>
            <span>
              {formatRating(venue.rating, locale)}
            </span>
          </div>
        </div>
        {venue.isVerified && (
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
            {t("verified", locale)}
          </span>
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href={`/venues/${venue.id}/request`}
          className="rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
        >
          {t("requestQuote", locale)}
        </Link>
        <Link
          href={`/venues/${venue.id}/availability`}
          className="rounded-full border border-gray-200 px-5 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
        >
          {t("checkAvailability", locale)}
        </Link>
      </div>
    </div>
  </section>
);

const VenueSummary = ({ venue, locale }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-semibold text-gray-900">{t("quickSummary", locale)}</h2>
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("address", locale)}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {venue.location?.address || t("noData", locale)}
        </p>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("capacities", locale)}
        </p>
        <div className="mt-2 text-sm text-gray-600">
          <p>
            {t("seated", locale)}: {venue.capacity?.seated ?? t("noData", locale)}
          </p>
          <p>
            {t("standing", locale)}: {venue.capacity?.standing ?? t("noData", locale)}
          </p>
          <p>
            {t("banquet", locale)}: {venue.capacity?.banquet ?? t("noData", locale)}
          </p>
          <p>
            {t("conference", locale)}: {venue.capacity?.conference ?? t("noData", locale)}
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("allowedEvents", locale)}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {venue.eventTypes?.length
            ? venue.eventTypes.join(", ")
            : t("noData", locale)}
        </p>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("startingAt", locale)}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {formatPrice(venue.pricing?.baseAmount, venue.pricing?.currency, locale)}
        </p>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("badge", locale)}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {venue.isVerified ? t("verified", locale) : t("noData", locale)}
        </p>
      </div>
    </div>
  </section>
);

const VenueAbout = ({ venue, locale }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-semibold text-gray-900">{t("about", locale)}</h2>
    <p className="mt-3 text-sm text-gray-600">
      {venue.description || t("noData", locale)}
    </p>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("vibe", locale)}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {venue.vibe || t("noData", locale)}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("recommendedFor", locale)}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {venue.recommendedFor || t("noData", locale)}
        </p>
      </div>
    </div>
  </section>
);

const VenueAmenities = ({ venue, locale }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-semibold text-gray-900">{t("amenities", locale)}</h2>
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
              {label || t("noData", locale)}
            </span>
            <span className="text-xs text-gray-400">
              {included ? t("included", locale) : t("extra", locale)}
            </span>
          </div>
        );
      })}
      {!venue.amenities?.length && (
        <p className="text-sm text-gray-600">{t("noData", locale)}</p>
      )}
    </div>
  </section>
);

const VenuePricing = ({ venue, locale }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-semibold text-gray-900">{t("pricing", locale)}</h2>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("pricingModel", locale)}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {venue.pricing?.model || t("noData", locale)}
        </p>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("basePrice", locale)}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {formatPrice(venue.pricing?.baseAmount, venue.pricing?.currency, locale)}
        </p>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("minHours", locale)}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {venue.pricing?.minimumHours ?? t("noData", locale)}
        </p>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {t("extras", locale)}
        </p>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          {(venue.pricing?.extras || []).map((extra) => (
            <p key={extra.label}>
              {extra.label}: {formatPrice(extra.amount, venue.pricing?.currency, locale)}
            </p>
          ))}
          {!venue.pricing?.extras?.length && <p>{t("noData", locale)}</p>}
        </div>
      </div>
    </div>
  </section>
);

const VenueAvailability = ({ venue, locale }) => {
  const slots = venue.availability?.slots || [];
  const rules = venue.availability?.rules || [];
  const exceptions = venue.availability?.exceptions || [];
  const isAvailable = slots.length > 0 || rules.length > 0;

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-900">
          {t("availability", locale)}
        </h2>
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {isAvailable ? t("available", locale) : t("unavailable", locale)}
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {slots.length ? (
          <div className="space-y-2">
            {slots.map((slot, index) => (
              <div
                key={`${slot.date || "slot"}-${index}`}
                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 text-xs text-gray-600"
              >
                <span>{formatDate(slot.date, locale)}</span>
                <span>
                  {slot.from || t("noData", locale)} - {slot.to || t("noData", locale)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">{t("noData", locale)}</p>
        )}
        {(rules.length > 0 || exceptions.length > 0) && (
          <p className="text-xs text-gray-400">
            {rules.length} {t("rules", locale)} · {exceptions.length}{" "}
            {t("unavailable", locale)}
          </p>
        )}
      </div>
      <Link
        href={`/venues/${venue.id}/availability`}
        className="mt-4 inline-flex rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
      >
        {t("requestDate", locale)}
      </Link>
    </section>
  );
};

const VenueRules = ({ venue, locale }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-semibold text-gray-900">{t("rules", locale)}</h2>
    <div className="mt-4 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>{t("alcohol", locale)}</span>
        <span>{formatBoolean(venue.rules?.alcoholAllowed, locale)}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>{t("noise", locale)}</span>
        <span>{venue.rules?.noiseLimit ?? t("noData", locale)}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>{t("smoking", locale)}</span>
        <span>{formatBoolean(venue.rules?.smoking, locale)}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>{t("cancellation", locale)}</span>
        <span>{venue.rules?.cancellationPolicy ?? t("noData", locale)}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>{t("deposit", locale)}</span>
        <span>{formatBoolean(venue.rules?.depositRequired, locale)}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>{t("insurance", locale)}</span>
        <span>{formatBoolean(venue.rules?.insuranceRequired, locale)}</span>
      </div>
    </div>
  </section>
);

const VenueReviews = ({ venue, locale }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-sm font-semibold text-gray-900">{t("reviews", locale)}</h2>
      <p className="text-sm text-gray-500">
        {formatRating(venue.rating, locale)}
      </p>
    </div>
    <div className="mt-4 grid gap-4">
      {(venue.reviews || []).map((review) => (
        <div key={review.id} className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <span>{review.eventType || t("noData", locale)}</span>
            <span>{review.rating}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
          {review.isVerified && (
            <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
              {t("verifiedReview", locale)}
            </span>
          )}
        </div>
      ))}
      {!venue.reviews?.length && (
        <p className="text-sm text-gray-600">{t("noData", locale)}</p>
      )}
    </div>
  </section>
);

const VenueElintysSections = ({ venue, locale }) => (
  <section className="grid gap-6 lg:grid-cols-2">
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">
        {t("recommendedProviders", locale)}
      </h2>
      <div className="mt-4 space-y-3">
        {(venue.recommendedProviders || []).map((provider) => (
          <div
            key={provider.id}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 text-sm text-gray-600"
          >
            <span>{provider.name}</span>
            <Link
              href={`/providers/${provider.id}`}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              {t("view", locale)}
            </Link>
          </div>
        ))}
        {!venue.recommendedProviders?.length && (
          <p className="text-sm text-gray-600">{t("noData", locale)}</p>
        )}
      </div>
    </div>
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">
        {t("pastEvents", locale)}
      </h2>
      <div className="mt-4 space-y-3">
        {(venue.pastEvents || []).map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 text-sm text-gray-600"
          >
            <span>{event.name}</span>
            <span className="text-xs text-gray-400">{event.date}</span>
          </div>
        ))}
        {!venue.pastEvents?.length && (
          <p className="text-sm text-gray-600">{t("noData", locale)}</p>
        )}
      </div>
    </div>
  </section>
);

const FinalCTA = ({ venue, locale }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {t("finalCtaTitle", locale)}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{t("finalCtaText", locale)}</p>
      </div>
      <Link
        href={`/venues/${venue.id}/contact`}
        className="rounded-full bg-gray-900 px-5 py-2 text-xs font-semibold text-white hover:bg-gray-800"
      >
        {t("contactOwner", locale)}
      </Link>
    </div>
  </section>
);

const VenueNotFound = ({ locale }) => (
  <main className="min-h-screen bg-slate-50">
    <Navbar />
    <section className="container mx-auto px-4 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          {t("notFoundTitle", locale)}
        </h1>
        <p className="mt-3 text-sm text-slate-600">{t("notFoundText", locale)}</p>
        <Link
          href="/venues"
          className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
        >
          {t("backToListing", locale)}
        </Link>
      </div>
    </section>
    <Footer />
  </main>
);

export default function VenueDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { current: venue, detailStatus } = useSelector((state) => state.venues);
  const locale = language === "en" ? "en" : "fr";

  useEffect(() => {
    if (id) {
      dispatch(fetchVenueById(id));
    }
  }, [dispatch, id]);

  if (detailStatus === "loading" && !venue) {
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

  if (!venue || detailStatus === "failed") {
    return <VenueNotFound locale={locale} />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: venue.name || venue.title,
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.location?.address || "",
      addressLocality: venue.location?.city || "",
      addressCountry: venue.location?.country || "",
    },
    aggregateRating: venue.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: venue.rating.average,
          reviewCount: venue.rating.count,
        }
      : undefined,
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="container mx-auto px-4 pb-24 pt-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
            <FinalCTA venue={venue} locale={locale} />
          </div>
          <StickyVenueCTA venue={venue} locale={locale} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
