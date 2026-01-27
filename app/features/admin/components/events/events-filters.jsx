import AdminCard from "../admin-card";

const EventsFilters = ({
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  cityFilter,
  onCityChange,
  dateFilter,
  onDateChange,
  t,
}) => (
  <AdminCard>
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="text-sm text-slate-600">{t("Filtres")}</div>
      <div className="flex flex-wrap gap-3">
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
        >
          <option value="ALL">{t("Tous statuts")}</option>
          <option value="DRAFT">{t("Brouillon")}</option>
          <option value="PENDING_REVIEW">{t("En attente")}</option>
          <option value="PUBLISHED">{t("Publie")}</option>
          <option value="REJECTED">{t("Refuse")}</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
        >
          <option value="ALL">{t("Toutes categories")}</option>
          <option value="Festival">{t("Festival")}</option>
          <option value="Conference">{t("Conference")}</option>
          <option value="Soiree">{t("Soiree")}</option>
          <option value="Networking">{t("Networking")}</option>
        </select>
        <select
          value={cityFilter}
          onChange={(event) => onCityChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
        >
          <option value="ALL">{t("Toutes villes")}</option>
          <option value="Abidjan">{t("Abidjan")}</option>
          <option value="Paris">{t("Paris")}</option>
          <option value="Lome">{t("Lome")}</option>
          <option value="Dakar">{t("Dakar")}</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(event) => onDateChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
        />
      </div>
    </div>
  </AdminCard>
);

export default EventsFilters;
