import { useCallback, useEffect, useMemo, useState } from "react";
import { adminApi } from "../../../store/adminApi";
import { getStatusParam, mapAdminEvent } from "../utils/event-mappers";

export default function useAdminEvents() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");
  const [eventsData, setEventsData] = useState({ items: [], total: 0, page: 1, limit: 10 });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rejectEvent, setRejectEvent] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const filtered = useMemo(() => {
    return eventsData.items.filter((event) => {
      const displayStatus = event.displayStatus || event.status;
      const matchesStatus = statusFilter === "ALL" || displayStatus === statusFilter;
      const matchesCategory =
        categoryFilter === "ALL" || event.category === categoryFilter;
      const matchesCity = cityFilter === "ALL" || event.city === cityFilter;
      const matchesDate =
        !dateFilter || (event.dateRaw && new Date(event.dateRaw) >= new Date(dateFilter));
      return matchesStatus && matchesCategory && matchesCity && matchesDate;
    });
  }, [eventsData.items, statusFilter, categoryFilter, cityFilter, dateFilter]);

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const response = await adminApi.fetchEvents({
          page,
          limit: 10,
          status: getStatusParam(statusFilter),
        });

        if (isMounted) {
          const items = Array.isArray(response.data?.items) ? response.data.items : [];
          const mapped = items.map(mapAdminEvent);
          setEventsData({
            items: mapped,
            total: response.data?.total || 0,
            page: response.data?.page || page,
            limit: response.data?.limit || 10,
          });
          console.log("[admin/events] fetched:", mapped);
        }
      } catch (error) {
        if (isMounted) {
          setEventsData({ items: [], total: 0, page, limit: 10 });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, [page, statusFilter, reloadKey]);

  const totalPages = Math.max(1, Math.ceil(eventsData.total / eventsData.limit));

  const handleApprove = useCallback(
    (eventId) => adminApi.approveEvent(eventId).then(reload),
    [reload]
  );

  const handleUnpublish = useCallback(
    (eventId) => adminApi.unpublishEvent(eventId).then(reload),
    [reload]
  );

  const handleReject = useCallback(
    (eventId) =>
      adminApi.rejectEvent(eventId).then(() => {
        setRejectEvent(null);
        reload();
      }),
    [reload]
  );

  return {
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    cityFilter,
    setCityFilter,
    dateFilter,
    setDateFilter,
    eventsData,
    filtered,
    page,
    setPage,
    totalPages,
    isLoading,
    selectedEvent,
    setSelectedEvent,
    rejectEvent,
    setRejectEvent,
    rejectReason,
    setRejectReason,
    handleApprove,
    handleUnpublish,
    handleReject,
  };
}
