import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../../store/adminApi";

export default function useAdminVenues() {
  const [venuesData, setVenuesData] = useState({ items: [], total: 0, page: 1, limit: 10 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadVenues = async () => {
      setIsLoading(true);
      try {
        const response = await adminApi.fetchVenues({ page: 1, limit: 20 });
        if (isMounted) {
          setVenuesData(response.data || { items: [], total: 0, page: 1, limit: 20 });
        }
      } catch (error) {
        if (isMounted) {
          setVenuesData({ items: [], total: 0, page: 1, limit: 20 });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadVenues();

    return () => {
      isMounted = false;
    };
  }, []);

  const rows = useMemo(
    () =>
      venuesData.items.map((venue) => ({
        id: venue.id,
        name: venue.title || "-",
        city: venue.city || "-",
        capacity: venue.capacityMax ?? "-",
        status: venue.isVerified ? "ACTIVE" : "PENDING",
        eventsCount: "-",
      })),
    [venuesData.items]
  );

  return {
    rows,
    isLoading,
  };
}
