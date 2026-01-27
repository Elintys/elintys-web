import AdminTable from "../admin-table";
import AdminStatusPill from "../admin-status-pill";

const EventsTable = ({
  rows,
  isLoading,
  onSelectEvent,
  onRejectEvent,
  onApproveEvent,
  onUnpublishEvent,
  t,
}) => {
  const columns = [
    { key: "title", label: t("Evenement") },
    { key: "organizer", label: t("Organisateur") },
    { key: "city", label: t("Ville") },
    { key: "date", label: t("Date") },
    { key: "createdAt", label: t("Date de creation") },
    {
      key: "status",
      label: t("Statut"),
      render: (row) => <AdminStatusPill status={row.displayStatus} />,
    },
    {
      key: "actions",
      label: t("Actions"),
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Preview")}
          </button>
          <button
            type="button"
            onClick={() => onSelectEvent(row)}
            className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-800"
          >
            {t("Voir details")}
          </button>
          <button
            type="button"
            onClick={() => onRejectEvent(row)}
            className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-700"
          >
            {t("Refuser")}
          </button>
          <button
            type="button"
            onClick={() => onApproveEvent(row.id)}
            className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            {t("Approuver")}
          </button>
          <button
            type="button"
            onClick={() => onUnpublishEvent(row.id)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Depublier")}
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminTable
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      emptyMessage={t("Aucun evenement pour ce filtre.")}
    />
  );
};

export default EventsTable;
