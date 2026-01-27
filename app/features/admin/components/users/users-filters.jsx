import AdminCard from "../admin-card";

const UsersFilters = ({
  query,
  onQueryChange,
  roleFilter,
  onRoleChange,
  statusFilter,
  onStatusChange,
  t,
}) => (
  <AdminCard>
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={t("Rechercher un utilisateur")}
          className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
        />
      </div>
      <div className="flex items-center gap-3">
        <select
          value={roleFilter}
          onChange={(event) => onRoleChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
        >
          <option value="ALL">{t("Tous les roles")}</option>
          <option value="USER">{t("USER")}</option>
          <option value="ORGANIZER">{t("ORGANIZER")}</option>
          <option value="PROVIDER">{t("PROVIDER")}</option>
          <option value="ADMIN">{t("ADMIN")}</option>
        </select>
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
        >
          <option value="ALL">{t("Tous les statuts")}</option>
          <option value="ACTIVE">{t("Actif")}</option>
          <option value="PENDING">{t("En attente")}</option>
          <option value="SUSPENDED">{t("Suspendu")}</option>
        </select>
      </div>
    </div>
  </AdminCard>
);

export default UsersFilters;
