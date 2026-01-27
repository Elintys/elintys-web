import AdminTable from "../admin-table";
import AdminStatusPill from "../admin-status-pill";
import AdminBadge from "../admin-badge";

const UsersTable = ({ rows, isLoading, onToggleStatus, onSelectUser, onForceRole, t }) => {
  const columns = [
    { key: "name", label: t("Nom") },
    { key: "email", label: t("Email") },
    {
      key: "roles",
      label: t("Roles"),
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.roles.map((role) => (
            <AdminBadge key={role} tone="info">
              {role}
            </AdminBadge>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      label: t("Statut"),
      render: (row) => <AdminStatusPill status={row.status} />,
    },
    { key: "createdAt", label: t("Date d'inscription") },
    { key: "lastActive", label: t("Derniere activite") },
    {
      key: "actions",
      label: t("Actions"),
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onToggleStatus(row)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {row.status === "SUSPENDED" ? t("Reactiver") : t("Suspendre")}
          </button>
          <button
            type="button"
            onClick={() => onSelectUser(row)}
            className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-800"
          >
            {t("Voir details")}
          </button>
          <button
            type="button"
            onClick={() => onForceRole(row, "ORGANIZER")}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Forcer ORGANIZER")}
          </button>
          <button
            type="button"
            onClick={() => onForceRole(row, "PROVIDER")}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Forcer PROVIDER")}
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
      emptyMessage={t("Aucun utilisateur ne correspond aux filtres.")}
    />
  );
};

export default UsersTable;
