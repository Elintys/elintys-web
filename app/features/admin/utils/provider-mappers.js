export const mapAdminProvider = (provider, fallbackName) => ({
  id: provider._id || provider.id,
  name:
    provider.user?.displayName ||
    provider.user?.email ||
    provider.userId ||
    fallbackName,
  email: provider.user?.email || "-",
  status: provider.status || "ACTIVE",
  verified: Boolean(provider.isVerified),
  rating: provider.rating?.average ?? 0,
  servicesCount: Array.isArray(provider.services) ? provider.services.length : 0,
  services: Array.isArray(provider.services)
    ? provider.services.map((service) => ({
        serviceId: service.serviceId || service._id || service.id,
        title: service.title || "-",
        category: service.category || "-",
        pricing: service.pricing || {},
        isActive: service.isActive !== false,
      }))
    : [],
  reservations: [],
  reviews: [],
});
