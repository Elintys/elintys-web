"use client";

import { useLanguage } from "../../../i18n/language-provider";
import useAdminVenues from "../hooks/use-admin-venues";
import VenuesTable from "../components/venues/venues-table";

export default function AdminVenuesPage() {
  const { t } = useLanguage();
  const { rows, isLoading } = useAdminVenues();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Lieux")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Gestion des espaces et disponibilites associees.")}
        </p>
      </div>

      <VenuesTable rows={rows} isLoading={isLoading} t={t} />
    </div>
  );
}
