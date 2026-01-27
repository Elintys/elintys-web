import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../../store/adminApi";
import {
  buildEventsByCategory,
  buildEventsByStatus,
  buildUserRegistrations,
  mockOverview,
} from "../utils/overview-data";

export default function useAdminOverview() {
  const [overview, setOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadOverview = async () => {
      try {
        const response = await adminApi.fetchOverview();
        if (isMounted) {
          setOverview(response.data || null);
        }
      } catch (error) {
        if (isMounted) {
          setOverview(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  const partialErrors = useMemo(() => {
    const data = overview || {};
    return Array.isArray(data.partialErrors)
      ? data.partialErrors.map((item) => item.service)
      : [];
  }, [overview]);

  const kpis = useMemo(() => {
    const data = overview || {};
    const useUsersMock = partialErrors.includes("users");
    const useEventsMock = partialErrors.includes("events");
    const useProvidersMock = partialErrors.includes("providers");

    return [
      {
        label: "Total utilisateurs",
        value: useUsersMock
          ? mockOverview.totalUsers
          : data.totalUsers ?? mockOverview.totalUsers,
        helper: mockOverview.helpers.totalUsers,
      },
      {
        label: "Utilisateurs actifs (30 jours)",
        value: useUsersMock
          ? mockOverview.activeUsers
          : data.activeUsers ?? mockOverview.activeUsers,
        helper: mockOverview.helpers.activeUsers,
      },
      {
        label: "Total evenements",
        value: useEventsMock
          ? mockOverview.totalEvents
          : data.totalEvents ?? mockOverview.totalEvents,
        helper: mockOverview.helpers.totalEvents,
      },
      {
        label: "Evenements publies",
        value: useEventsMock
          ? mockOverview.publishedEvents
          : data.publishedEvents ?? mockOverview.publishedEvents,
        helper: mockOverview.helpers.publishedEvents,
      },
      {
        label: "Evenements en attente de validation",
        value: useEventsMock
          ? mockOverview.pendingEvents
          : data.pendingEvents ?? mockOverview.pendingEvents,
        helper: mockOverview.helpers.pendingEvents,
      },
      {
        label: "Total prestataires actifs",
        value: useProvidersMock
          ? mockOverview.totalProviders
          : data.totalProviders ?? mockOverview.totalProviders,
        helper: mockOverview.helpers.totalProviders,
      },
    ];
  }, [overview, partialErrors]);

  const statsBase = useMemo(() => {
    const data = overview || {};
    return {
      totalUsers: data.totalUsers ?? mockOverview.totalUsers,
      activeUsers: data.activeUsers ?? mockOverview.activeUsers,
      totalEvents: data.totalEvents ?? mockOverview.totalEvents,
      publishedEvents: data.publishedEvents ?? mockOverview.publishedEvents,
      pendingEvents: data.pendingEvents ?? mockOverview.pendingEvents,
    };
  }, [overview]);

  const chartData = useMemo(() => {
    return {
      userRegistrations: buildUserRegistrations(
        statsBase.totalUsers,
        statsBase.activeUsers
      ),
      eventsByStatus: buildEventsByStatus(
        statsBase.totalEvents,
        statsBase.publishedEvents,
        statsBase.pendingEvents
      ),
      eventsByCategory: buildEventsByCategory(statsBase.totalEvents),
    };
  }, [statsBase]);

  const alerts = useMemo(() => {
    const data = overview || {};
    if (partialErrors.includes("audit")) {
      return mockOverview.recentAlerts;
    }
    return Array.isArray(data.recentAlerts)
      ? data.recentAlerts
      : mockOverview.recentAlerts;
  }, [overview, partialErrors]);

  return {
    overview,
    isLoading,
    partialErrors,
    kpis,
    chartData,
    alerts,
  };
}
