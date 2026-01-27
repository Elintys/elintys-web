"use client";

import { useLanguage } from "../../../i18n/language-provider";
import useProfilePrivacy from "../hooks/use-profile-privacy";
import PrivacyHeader from "../components/privacy/privacy-header";
import PrivacyConsents from "../components/privacy/privacy-consents";
import PrivacyActions from "../components/privacy/privacy-actions";
import PrivacyConfirmModal from "../components/privacy/privacy-confirm-modal";

export default function ProfilePrivacyPage() {
  const { language, t } = useLanguage();
  const {
    currentUser,
    termsDate,
    privacyDate,
    message,
    loadingAction,
    confirmType,
    setConfirmType,
    deleteConfirm,
    setDeleteConfirm,
    handleExport,
    handleDeactivate,
    handleDelete,
  } = useProfilePrivacy(t, language);

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
        {t("Chargement...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PrivacyHeader t={t} />

      <PrivacyConsents
        termsDate={termsDate}
        privacyDate={privacyDate}
        marketingConsent={currentUser?.marketing_consent}
        t={t}
      />

      <PrivacyActions message={message} onConfirm={setConfirmType} t={t} />

      <PrivacyConfirmModal
        confirmType={confirmType}
        deleteConfirm={deleteConfirm}
        loadingAction={loadingAction}
        onDeleteConfirmChange={setDeleteConfirm}
        onCancel={() => {
          setConfirmType(null);
          setDeleteConfirm("");
        }}
        onExport={handleExport}
        onDeactivate={handleDeactivate}
        onDelete={handleDelete}
        t={t}
      />
    </div>
  );
}
