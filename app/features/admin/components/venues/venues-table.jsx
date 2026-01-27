import AdminTable from "../admin-table";
import AdminStatusPill from "../admin-status-pill";

const VenuesTable = ({ rows, isLoading, t }) => {
  const columns = [
    { key: "name", label: t("Lieu") },
    { key: "city", label: t("Ville") },
    { key: "capacity", label: t("Capacite") },
    {
      key: "status",
      label: t("Statut"),
      render: (row) => <AdminStatusPill status={row.status} />,
    },
    { key: "eventsCount", label: t("Evenements associes") },
    {
      key: "actions",
      label: t("Actions"),
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Voir fiche")}
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Detecter doublons")}
          </button>
          <button
            type="button"
            className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
              row.status === "ACTIVE"
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {row.status === "ACTIVE" ? t("Desactiver") : t("Activer")}
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
      emptyMessage={t("Aucun lieu pour le moment.")}
    />
  );
};

export default VenuesTable;
