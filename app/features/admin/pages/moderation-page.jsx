"use client";

import AdminCard from "../components/admin-card";
import { useLanguage } from "../../../i18n/language-provider";
import { mockReports } from "../utils/moderation-data";
import ModerationTable from "../components/moderation/moderation-table";

export default function AdminModerationPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Moderation")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Suivi des signalements, refus et demandes en attente.")}
        </p>
      </div>

      <AdminCard title={t("Signalements utilisateurs")} subtitle={t("Comptes suspects")}>
        <p className="text-sm text-slate-600">
          {t("Suivi des demandes de blocage et comportements signales.")}
        </p>
      </AdminCard>

      <AdminCard title={t("Signalements evenements")} subtitle={t("Contenu a verifier")}>
        <p className="text-sm text-slate-600">
          {t("Evenements en attente de validation ou signalements publics.")}
        </p>
      </AdminCard>

      <AdminCard title={t("Signalements prestataires")} subtitle={t("Services marketplace")}>
        <p className="text-sm text-slate-600">
          {t("Qualite de service et litiges signalés par les clients.")}
        </p>
      </AdminCard>

      <ModerationTable rows={mockReports} t={t} />
    </div>
  );
}
