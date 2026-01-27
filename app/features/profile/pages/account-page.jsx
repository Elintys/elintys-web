"use client";

import { useLanguage } from "../../../i18n/language-provider";
import useProfileAccount from "../hooks/use-profile-account";
import AccountHeader from "../components/account/account-header";
import AccountForm from "../components/account/account-form";

export default function ProfileAccountPage() {
  const { language, t } = useLanguage();
  const {
    currentUser,
    form,
    message,
    loading,
    photoPreview,
    statusValue,
    statusStyles,
    lastLogin,
    handleChange,
    handleSubmit,
    maxBioLength,
  } = useProfileAccount(t, language);

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
        {t("Chargement...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AccountHeader
        statusValue={statusValue}
        statusStyles={statusStyles}
        lastLogin={lastLogin}
        t={t}
      />
      <AccountForm
        form={form}
        photoPreview={photoPreview}
        maxBioLength={maxBioLength}
        currentUser={currentUser}
        loading={loading}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
        t={t}
      />
    </div>
  );
}
