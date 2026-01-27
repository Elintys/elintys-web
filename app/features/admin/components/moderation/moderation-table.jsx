import AdminTable from "../admin-table";
import AdminStatusPill from "../admin-status-pill";

const ModerationTable = ({ rows, t }) => {
  const columns = [
    { key: "type", label: t("Type") },
    { key: "target", label: t("Cible") },
    { key: "reason", label: t("Motif") },
    { key: "date", label: t("Date") },
    {
      key: "status",
      label: t("Statut"),
      render: (row) => <AdminStatusPill status={row.status} />,
    },
    {
      key: "actions",
      label: t("Actions"),
      render: () => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Examiner")}
          </button>
          <button
            type="button"
            className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            {t("Traiter")}
          </button>
          <button
            type="button"
            className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-800"
          >
            {t("Appliquer sanction")}
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminTable
      columns={columns}
      rows={rows}
      emptyMessage={t("Aucun signalement pour le moment.")}
    />
  );
};

export default ModerationTable;
