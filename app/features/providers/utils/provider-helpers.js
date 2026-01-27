export const getProviderId = (provider) =>
  provider?.providerId ||
  provider?.id ||
  provider?._id ||
  provider?.userId ||
  provider?.user?.id;

export const getProviderName = (provider) =>
  provider?.name ||
  provider?.companyName ||
  provider?.title ||
  provider?.displayName ||
  provider?.user?.displayName ||
  provider?.user?.name ||
  "Prestataire";

export const getProviderCategory = (provider) => {
  const fromServices =
    provider?.services?.find((service) => service?.category)?.category ||
    provider?.services?.[0]?.category;
  return (
    fromServices ||
    provider?.mainCategory ||
    provider?.category ||
    provider?.categories?.[0]
  );
};

export const getProviderLocation = (provider) =>
  provider?.location?.city ||
  provider?.city ||
  provider?.city ||
  provider?.user?.city ||
  provider?.location?.label;

export const getProviderRating = (provider) => {
  const average =
    provider?.rating?.average ||
    provider?.rating?.avg ||
    provider?.ratingAverage ||
    provider?.averageRating;
  const count =
    provider?.rating?.count ||
    provider?.ratingCount ||
    provider?.reviewsCount ||
    provider?.reviews?.length;
  return {
    average: Number.isFinite(Number(average)) ? Number(average) : null,
    count: Number.isFinite(Number(count)) ? Number(count) : null,
  };
};

export const getProviderPricing = (provider) => {
  const amount =
    provider?.startingPrice ||
    provider?.pricing?.startingAt ||
    provider?.pricing?.minPrice ||
    provider?.pricing?.amount ||
    provider?.price?.startingAt ||
    provider?.startingPrice;
  const currency =
    provider?.pricing?.currency ||
    provider?.currency ||
    provider?.price?.currency ||
    provider?.currency;
  return { amount, currency };
};

export const getProviderImage = (provider) =>
  provider?.media?.avatar ||
  provider?.media?.images?.[0] ||
  provider?.photoUrl ||
  provider?.avatarUrl ||
  provider?.imageUrl ||
  provider?.logoUrl ||
  provider?.user?.avatarUrl;

export const getProviderLanguages = (provider) =>
  provider?.languages || provider?.user?.languages || [];

export const getAvailabilityStatus = (provider) =>
  provider?.availability?.isAvailable ||
  provider?.availability?.available ||
  provider?.isAvailable;
