"use client";

import { useLanguage } from "../../../i18n/language-provider";
import useAdminProviders from "../hooks/use-admin-providers";
import ProvidersTable from "../components/providers/providers-table";
import ProviderDetailsCard from "../components/providers/provider-details-card";

export default function AdminProvidersPage() {
  const { t } = useLanguage();
  const {
    selectedProvider,
    setSelectedProvider,
    mappedProviders,
    isLoading,
    handleVerifyProvider,
    handleSuspendService,
  } = useAdminProviders(t);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          {t("Prestataires & services")}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Controle qualite et suivi des prestataires marketplace.")}
        </p>
      </div>

      <ProvidersTable
        rows={mappedProviders}
        isLoading={isLoading}
        onVerify={handleVerifyProvider}
        onSelect={setSelectedProvider}
        t={t}
      />

      <ProviderDetailsCard
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
        onSuspendService={handleSuspendService}
        t={t}
      />
    </div>
  );
}
