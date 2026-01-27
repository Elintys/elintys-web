import { useCallback, useEffect, useMemo, useState } from "react";
import { adminApi } from "../../../store/adminApi";
import { mapAdminProvider } from "../utils/provider-mappers";

export default function useAdminProviders(t) {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providersData, setProvidersData] = useState({ items: [], total: 0, page: 1, limit: 10 });
  const [isLoading, setIsLoading] = useState(false);

  const loadProviders = useCallback(async (shouldUpdate = () => true) => {
    setIsLoading(true);
    try {
      const response = await adminApi.fetchProviders({ page: 1, limit: 20 });
      if (!shouldUpdate()) return;
      const payload = response.data || { items: [], total: 0, page: 1, limit: 20 };
      setProvidersData(payload);
      console.log("[admin/providers] fetched:", payload.items || []);
    } catch (error) {
      if (!shouldUpdate()) return;
      setProvidersData({ items: [], total: 0, page: 1, limit: 20 });
    } finally {
      if (shouldUpdate()) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    loadProviders(() => isMounted);

    return () => {
      isMounted = false;
    };
  }, [loadProviders]);

  const mappedProviders = useMemo(
    () => providersData.items.map((provider) => mapAdminProvider(provider, t("Prestataire"))),
    [providersData.items, t]
  );

  const handleVerifyProvider = useCallback(
    (providerId, nextValue) =>
      adminApi.verifyProvider(providerId, nextValue).then(() => loadProviders()),
    [loadProviders]
  );

  const handleSuspendService = useCallback(
    (serviceId) => adminApi.suspendService(serviceId).then(() => loadProviders()),
    [loadProviders]
  );

  return {
    selectedProvider,
    setSelectedProvider,
    mappedProviders,
    isLoading,
    handleVerifyProvider,
    handleSuspendService,
  };
}
