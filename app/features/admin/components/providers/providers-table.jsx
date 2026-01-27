import AdminTable from "../admin-table";
import AdminStatusPill from "../admin-status-pill";
import AdminBadge from "../admin-badge";

const ProvidersTable = ({ rows, isLoading, onVerify, onSelect, t }) => {
  const columns = [
    { key: "name", label: t("Nom prestataire") },
    { key: "email", label: t("Email") },
    {
      key: "status",
      label: t("Statut compte"),
      render: (row) => <AdminStatusPill status={row.status} />,
    },
    {
      key: "verified",
      label: t("Verification"),
      render: (row) => (
        <AdminBadge tone={row.verified ? "success" : "warning"}>
          {row.verified ? t("Oui") : t("Non")}
        </AdminBadge>
      ),
    },
    { key: "servicesCount", label: t("Nombre de services") },
    {
      key: "rating",
      label: t("Note moyenne"),
      render: (row) => `${row.rating} / 5`,
    },
    {
      key: "actions",
      label: t("Actions"),
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onVerify(row.id, !row.verified)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {row.verified ? t("Deverifier") : t("Verifier")}
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {row.status === "SUSPENDED" ? t("Reactiver") : t("Suspendre")}
          </button>
          <button
            type="button"
            onClick={() => onSelect(row)}
            className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-800"
          >
            {t("Voir details")}
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
      emptyMessage={t("Aucun prestataire pour le moment.")}
    />
  );
};

export default ProvidersTable;
