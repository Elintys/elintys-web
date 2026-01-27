import FilterSection from "./filter-section";
import MultiSelectList from "./multi-select-list";
import { MIN_RATING_OPTIONS, PRICING_MODELS } from "../../utils/provider-filters";

const FiltersBar = ({
  filters,
  options,
  activeCount,
  onChange,
  onToggleCategory,
  onToggleLanguage,
  onReset,
}) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Filtres</p>
        <p className="text-sm text-gray-600">{activeCount} actif(s)</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
      >
        Reinitialiser
      </button>
    </div>

    <FilterSection title="Categories de service">
      <MultiSelectList
        options={options.categories}
        selected={filters.categories}
        onToggle={onToggleCategory}
        emptyLabel="Aucune categorie disponible."
      />
    </FilterSection>

    <FilterSection title="Localisation">
      <div className="space-y-3">
        <input
          type="text"
          value={filters.city}
          onChange={(event) => onChange("city", event.target.value)}
          placeholder="Ville"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            value={filters.radius}
            onChange={(event) => onChange("radius", event.target.value)}
            placeholder="Rayon (km)"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </FilterSection>

    <FilterSection title="Date de disponibilite">
      <input
        type="date"
        value={filters.date}
        onChange={(event) => onChange("date", event.target.value)}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
      />
    </FilterSection>

    <FilterSection title="Fourchette de prix">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          min="0"
          value={filters.minPrice}
          onChange={(event) => onChange("minPrice", event.target.value)}
          placeholder="Min"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
        <input
          type="number"
          min="0"
          value={filters.maxPrice}
          onChange={(event) => onChange("maxPrice", event.target.value)}
          placeholder="Max"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </div>
    </FilterSection>

    <FilterSection title="Note minimale">
      <select
        value={filters.minRating}
        onChange={(event) => onChange("minRating", event.target.value)}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
      >
        <option value="">Toutes</option>
        {MIN_RATING_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FilterSection>

    <FilterSection title="Prestataire verifie">
      <label className="flex items-center gap-3 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={filters.isVerified}
          onChange={(event) => onChange("isVerified", event.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600"
        />
        Afficher uniquement les verifies
      </label>
    </FilterSection>

    <FilterSection title="Type de tarification">
      <select
        value={filters.pricingModel}
        onChange={(event) => onChange("pricingModel", event.target.value)}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
      >
        <option value="">Tous</option>
        {PRICING_MODELS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FilterSection>

    <FilterSection title="Langues parlees">
      <MultiSelectList
        options={options.languages}
        selected={filters.languages}
        onToggle={onToggleLanguage}
        emptyLabel="Aucune langue disponible."
      />
    </FilterSection>
  </div>
);

export default FiltersBar;
