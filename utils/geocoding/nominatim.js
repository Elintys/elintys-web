// Utility to geocode a text address using Nominatim (OpenStreetMap) and return { lat, lng }.
const geocodeCache = new Map();

function normalizeAddress(address) {
  return address.replace(/\s+/g, " ").trim().toLowerCase();
}

export async function geocodeAddress(address) {
  const trimmed = address?.trim();
  if (!trimmed) {
    return null;
  }

  const cacheKey = normalizeAddress(trimmed);
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey);
  }

  const query = new URLSearchParams({
    format: "json",
    q: trimmed,
  });

  const fetchPromise = (async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${query.toString()}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "Elintys web client",
          },
        },
      );

      if (!response.ok) {
        return null;
      }

      const results = await response.json();
      if (!Array.isArray(results) || results.length === 0) {
        return null;
      }

      const { lat, lon } = results[0];
      const parsedLat = Number(lat);
      const parsedLng = Number(lon);
      if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLng)) {
        return null;
      }

      return { lat: parsedLat, lng: parsedLng };
    } catch {
      return null;
    }
  })();

  geocodeCache.set(cacheKey, fetchPromise);
  return fetchPromise;
}
