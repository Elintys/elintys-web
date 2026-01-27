import { getVenueDetailText } from "./venue-detail-copy";

export const formatPrice = (value, currency, locale) => {
  if (value == null) return getVenueDetailText("noData", locale);
  if (!currency) return String(value);
  return `${value} ${currency}`;
};

export const formatRating = (rating, locale) => {
  if (!rating) return getVenueDetailText("noData", locale);
  const average = rating.average ?? getVenueDetailText("noData", locale);
  const count = rating.count != null ? `(${rating.count})` : "";
  return `${average} ${count}`.trim();
};

export const formatBoolean = (value, locale) => {
  if (value === true) return locale === "fr" ? "Oui" : "Yes";
  if (value === false) return locale === "fr" ? "Non" : "No";
  return getVenueDetailText("noData", locale);
};

export const formatDate = (value, locale) => {
  if (!value) return getVenueDetailText("noData", locale);
  const localeTag = locale === "en" ? "en-US" : "fr-FR";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(localeTag);
};

export const buildVenueJsonLd = (venue) => ({
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
});
