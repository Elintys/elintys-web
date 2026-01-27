import { localeOptions, timezoneOptions } from "../../utils/preferences-options";

const PreferencesForm = ({ form, loading, message, onChange, onSubmit, t }) => (
  <form
    onSubmit={onSubmit}
    className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-5 max-w-2xl"
  >
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t("Langue")}
      </label>
      <select
        name="locale"
        value={form.locale}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
      >
        {localeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t("Fuseau horaire")}
      </label>
      <select
        name="timezone"
        value={form.timezone}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
      >
        {timezoneOptions.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-400 mt-1">
        {t("Les dates d'evenements s'affichent selon ce fuseau horaire.")}
      </p>
    </div>
    <label className="flex items-center gap-3 text-sm text-gray-600">
      <input
        type="checkbox"
        name="marketing_consent"
        checked={form.marketing_consent}
        onChange={onChange}
      />
      {t("Recevoir les offres et actualites Elintys")}
    </label>
    <div className="flex items-center gap-3">
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        {loading ? t("Mise a jour...") : t("Enregistrer")}
      </button>
      {message && (
        <span
          className={`text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </span>
      )}
    </div>
  </form>
);

export default PreferencesForm;
