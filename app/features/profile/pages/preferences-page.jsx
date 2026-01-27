"use client";

import { useLanguage } from "../../../i18n/language-provider";
import useProfilePreferences from "../hooks/use-profile-preferences";
import PreferencesHeader from "../components/preferences/preferences-header";
import PreferencesForm from "../components/preferences/preferences-form";

export default function ProfilePreferencesPage() {
  const { t, setLanguage } = useLanguage();
  const { currentUser, form, message, loading, handleChange, handleSubmit } =
    useProfilePreferences(t, setLanguage);

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
        {t("Chargement...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PreferencesHeader t={t} />
      <PreferencesForm
        form={form}
        loading={loading}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
        t={t}
      />
    </div>
  );
}
