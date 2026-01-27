const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

const toStringValue = (value) => {
  if (Array.isArray(value)) return value[0] || "";
  if (typeof value === "string") return value;
  return "";
};

const toNumberValue = (value, fallback) => {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;
  return fallback;
};

const toListValue = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim().length) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

export function buildVenueQuery(searchParams) {
  const q = toStringValue(searchParams?.q);
  const city = toStringValue(searchParams?.city);
  const radius = toNumberValue(searchParams?.radius, 0);
  const capacity = toNumberValue(searchParams?.capacity, 0);
  const minPrice = toNumberValue(searchParams?.minPrice, 0);
  const maxPrice = toNumberValue(searchParams?.maxPrice, 0);
  const eventTypes = toListValue(searchParams?.eventTypes);
  const amenities = toListValue(searchParams?.amenities);
  const isVerified = toStringValue(searchParams?.isVerified) === "true";
  const sort = toStringValue(searchParams?.sort) || "price_asc";
  const page = toNumberValue(searchParams?.page, DEFAULT_PAGE);
  const limit = toNumberValue(searchParams?.limit, DEFAULT_LIMIT);

  const queryParams = new URLSearchParams();

  if (city) queryParams.set("city", city);
  if (radius) queryParams.set("radius", String(radius));
  if (capacity) queryParams.set("capacity", String(capacity));
  if (minPrice) queryParams.set("minPrice", String(minPrice));
  if (maxPrice) queryParams.set("maxPrice", String(maxPrice));
  if (eventTypes.length) queryParams.set("eventTypes", eventTypes.join(","));
  if (amenities.length) queryParams.set("amenities", amenities.join(","));
  if (isVerified) queryParams.set("isVerified", "true");
  if (sort) queryParams.set("sort", sort);
  queryParams.set("page", String(page));
  queryParams.set("limit", String(limit));

  return {
    filters: {
      q,
      city,
      radius,
      capacity,
      minPrice,
      maxPrice,
      eventTypes,
      amenities,
      isVerified,
      sort,
      page,
      limit,
    },
    queryParams,
  };
}

export function normalizeVenueResponse(data, filters) {
  const fallbackPage = filters?.page || DEFAULT_PAGE;
  const fallbackLimit = filters?.limit || DEFAULT_LIMIT;

  const items = Array.isArray(data)
    ? data
    : Array.isArray(data?.items)
      ? data.items
      : Array.isArray(data?.venues)
        ? data.venues
        : Array.isArray(data?.data)
          ? data.data
          : [];

  const metaSource = data?.meta || data?.pagination || {};
  const total = Number(
    metaSource.total ?? data?.total ?? data?.count ?? items.length
  );
  const totalPages = Number(
    metaSource.totalPages ??
      data?.totalPages ??
      Math.max(1, Math.ceil(total / fallbackLimit))
  );

  const normalizedItems = items.map((item) => {
    const rawPricing = item?.pricing || {};
    const baseAmount =
      item?.pricing?.baseAmount ??
      item?.pricing?.amount ??
      item?.pricing?.startingAt ??
      null;

    return {
      id: item?.id || item?._id || "",
      title: item?.title || item?.name || "",
      city: item?.city || item?.location?.city || "",
      mainImage: item?.mainImage || item?.media?.images?.[0] || item?.imageUrl || "",
      capacityMax:
        item?.capacityMax || item?.capacity?.max || item?.capacity?.maximum || 0,
      pricing: {
        model: rawPricing.model || "",
        baseAmount: rawPricing.baseAmount ?? baseAmount,
      },
      amenities: Array.isArray(item?.amenities)
        ? item.amenities
        : Array.isArray(item?.amenityCodes)
          ? item.amenityCodes
          : [],
      rating: item?.rating || { average: 0, count: 0 },
      isVerified: Boolean(item?.isVerified),
    };
  });

  return {
    items: normalizedItems,
    meta: {
      page: Number(metaSource.page ?? fallbackPage),
      limit: Number(metaSource.limit ?? fallbackLimit),
      total,
      totalPages,
    },
  };
}
