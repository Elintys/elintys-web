export const getStatusParam = (statusFilter) => {
  if (statusFilter === "PENDING_REVIEW") return "DRAFT";
  if (statusFilter === "REJECTED") return "CANCELLED";
  if (statusFilter === "ALL") return undefined;
  return statusFilter;
};

export const mapAdminEvent = (event) => {
  const status = event.status || "DRAFT";
  const organizerLabel =
    event.organizer?.displayName ||
    event.organizer?.email ||
    event.organizerId ||
    "-";

  return {
    id: event._id || event.id,
    title: event.title || "-",
    organizer: organizerLabel,
    status,
    displayStatus:
      status === "DRAFT"
        ? "PENDING_REVIEW"
        : status === "CANCELLED"
          ? "REJECTED"
          : status,
    city: event.manualVenue?.city || "-",
    dateRaw: event.startDate ? new Date(event.startDate) : null,
    date: event.startDate ? new Date(event.startDate).toLocaleDateString() : "-",
    createdAt: event.createdAt ? new Date(event.createdAt).toLocaleDateString() : "-",
    category: event.categoryId || "-",
    reports: [],
  };
};
