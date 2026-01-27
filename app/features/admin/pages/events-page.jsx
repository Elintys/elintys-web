"use client";

import { useLanguage } from "../../../i18n/language-provider";
import useAdminEvents from "../hooks/use-admin-events";
import EventsFilters from "../components/events/events-filters";
import EventsTable from "../components/events/events-table";
import EventsPagination from "../components/events/events-pagination";
import EventDetailsCard from "../components/events/event-details-card";
import RejectEventModal from "../components/events/reject-event-modal";

export default function AdminEventsPage() {
  const { t } = useLanguage();
  const {
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    cityFilter,
    setCityFilter,
    dateFilter,
    setDateFilter,
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
  } = useAdminEvents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Evenements")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Controle des evenements soumis et publies.")}
        </p>
      </div>

      <EventsFilters
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        cityFilter={cityFilter}
        onCityChange={setCityFilter}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        t={t}
      />

      <EventsTable
        rows={filtered}
        isLoading={isLoading}
        onSelectEvent={setSelectedEvent}
        onRejectEvent={(event) => {
          setRejectEvent(event);
          setRejectReason("");
        }}
        onApproveEvent={handleApprove}
        onUnpublishEvent={handleUnpublish}
        t={t}
      />

      <EventsPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        t={t}
      />

      <EventDetailsCard
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        t={t}
      />

      <RejectEventModal
        event={rejectEvent}
        rejectReason={rejectReason}
        onReasonChange={setRejectReason}
        onCancel={() => setRejectEvent(null)}
        onConfirm={() => handleReject(rejectEvent?.id)}
        t={t}
      />
    </div>
  );
}
