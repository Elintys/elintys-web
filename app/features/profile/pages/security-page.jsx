"use client";

import { useLanguage } from "../../../i18n/language-provider";
import useProfileSecurity from "../hooks/use-profile-security";
import SecurityHeader from "../components/security/security-header";
import SecurityInfo from "../components/security/security-info";
import SecurityActions from "../components/security/security-actions";

export default function ProfileSecurityPage() {
  const { language, t } = useLanguage();
  const { currentUser, lastLogin, handleLogout, handleReLogin } = useProfileSecurity(language);

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
        {t("Chargement...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SecurityHeader t={t} />
      <SecurityInfo
        lastLogin={lastLogin}
        authProvider={currentUser?.auth_provider}
        t={t}
      />
      <SecurityActions onLogout={handleLogout} onRelogin={handleReLogin} t={t} />
    </div>
  );
}
