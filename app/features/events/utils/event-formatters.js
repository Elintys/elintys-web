export const formatMonth = (dateValue, locale) =>
  new Date(dateValue).toLocaleDateString(locale, { month: "short" }).toUpperCase();

export const formatDay = (dateValue, locale) =>
  new Date(dateValue).toLocaleDateString(locale, { day: "2-digit" });

export const formatTime = (dateValue, locale) =>
  new Date(dateValue).toLocaleTimeString(locale, { timeStyle: "short" });

export const getEventCoverImage = (event) =>
  event.coverImageUrl || event.imageUrl || event.image || "/images/image.png";

export const getEventCategoryLabel = (event) =>
  event.category?.name || event.categoryName || event.category || event.categoryId;

export const getEventLocationLabel = (event, t) =>
  event?.manualVenue?.city ||
  event?.manualVenue?.name ||
  event?.venue?.city ||
  event?.venue?.name ||
  event?.location ||
  t("Lieu a confirmer");

export const getEventPriceLabel = (event, t) => {
  if (event.price) {
    return `${event.price} ${event.currency || "CAD"}`;
  }
  if (event.isFree) return t("Gratuit");
  return t("Prix sur place");
};
