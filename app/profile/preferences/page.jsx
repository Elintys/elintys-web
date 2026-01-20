"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUserPreferences } from "../../store/slices/usersSlice";
import { useLanguage } from "../../i18n/LanguageProvider";

const localeOptions = [
  { value: "fr-CA", label: "Francais (Canada)" },
  { value: "en-CA", label: "English (Canada)" },
];

const timezoneOptions = [
  "America/Montreal",
  "America/Toronto",
  "America/Vancouver",
  "America/New_York",
  "Europe/Paris",
];

export default function ProfilePreferencesPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const { t, setLanguage } = useLanguage();
  const [form, setForm] = useState({
    locale: "fr-CA",
    timezone: "America/Montreal",
    marketing_consent: false,
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser) return;
    setForm({
      locale: currentUser.locale || "fr-CA",
      timezone: currentUser.timezone || "America/Montreal",
      marketing_consent: Boolean(currentUser.marketing_consent),
    });
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
        {t("Chargement...")}
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const action = await dispatch(updateUserPreferences(form));
      if (updateUserPreferences.rejected.match(action)) {
        setMessage({
          type: "error",
          text: action.payload?.message || t("Erreur lors de la mise a jour."),
        });
      } else {
        setMessage({ type: "success", text: t("Preferences mises a jour.") });
        const nextLanguage = form.locale.startsWith("en") ? "en" : "fr";
        setLanguage(nextLanguage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{t("Preferences")}</h2>
        <p className="text-sm text-gray-500 mt-2">
          {t("Ajustez la langue, le fuseau horaire et vos choix marketing.")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-5 max-w-2xl"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Langue")}
          </label>
          <select
            name="locale"
            value={form.locale}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
    </div>
  );
}
