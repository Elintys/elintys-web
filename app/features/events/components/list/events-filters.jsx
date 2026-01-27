export default function EventsFilters({
  t,
  categories,
  query,
  onQueryChange,
  categoryId,
  onCategoryChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  showFavorites,
  onToggleFavorites,
  onSavePreferences,
}) {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 mb-6 grid gap-4 md:grid-cols-5">
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={t("Recherche par titre")}
        className="border border-gray-200 rounded-lg px-3 py-2"
      />
      <select
        value={categoryId}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2"
      >
        <option value="">{t("Categorie")}</option>
        {categories.map((cat) => (
          <option key={cat._id || cat.name} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={startDate}
        onChange={(event) => onStartDateChange(event.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2"
      />
      <input
        type="date"
        value={endDate}
        onChange={(event) => onEndDateChange(event.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2"
      />
      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={(event) => onToggleFavorites(event.target.checked)}
          />
          {t("Favoris")}
        </label>
        <button
          type="button"
          onClick={onSavePreferences}
          className="text-sm text-indigo-600 hover:underline"
        >
          {t("Sauver mes preferences")}
        </button>
      </div>
    </div>
  );
}
