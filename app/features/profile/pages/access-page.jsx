"use client";

import { useLanguage } from "../../../i18n/language-provider";
import useProfileAccess from "../hooks/use-profile-access";
import AccessHeader from "../components/access/access-header";
import RoleCard from "../components/access/role-card";
import AccessCta from "../components/access/access-cta";

export default function ProfileAccessPage() {
  const { t } = useLanguage();
  const { currentUser, roles, roleEntries } = useProfileAccess();

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
        {t("Chargement...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AccessHeader t={t} />

      <div className="grid md:grid-cols-2 gap-6">
        {roleEntries.map(([roleKey, role]) => {
          const isActive = roles.includes(roleKey);
          return <RoleCard key={roleKey} roleKey={roleKey} role={role} isActive={isActive} t={t} />;
        })}
      </div>

      <AccessCta t={t} />
    </div>
  );
}
