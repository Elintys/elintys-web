"use client";

import AdminCard from "../components/AdminCard";
import AdminTable from "../components/AdminTable";
import AdminStatusPill from "../components/AdminStatusPill";
import { useLanguage } from "../../../i18n/LanguageProvider";

const mockReports = [
  {
    id: "rep-1",
    type: "Signalement utilisateur",
    target: "user",
    reason: "Comportement inapproprie",
    date: "2024-03-05",
    status: "OPEN",
  },
  {
    id: "rep-2",
    type: "Signalement evenement",
    target: "event",
    reason: "Description trompeuse",
    date: "2024-03-02",
    status: "OPEN",
  },
  {
    id: "rep-3",
    type: "Signalement prestataire",
    target: "service",
    reason: "Prestation non livree",
    date: "2024-02-28",
    status: "RESOLVED",
  },
];

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

      <AdminTable
        columns={[
          { key: "type", label: t("Type") },
          { key: "target", label: t("Cible") },
          { key: "reason", label: t("Motif") },
          { key: "date", label: t("Date") },
          {
            key: "status",
            label: t("Statut"),
            render: (row) => <AdminStatusPill status={row.status} />,
          },
          {
            key: "actions",
            label: t("Actions"),
            render: () => (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {t("Examiner")}
                </button>
                <button
                  type="button"
                  className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  {t("Traiter")}
                </button>
                <button
                  type="button"
                  className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-800"
                >
                  {t("Appliquer sanction")}
                </button>
              </div>
            ),
          },
        ]}
        rows={mockReports}
        emptyMessage={t("Aucun signalement pour le moment.")}
      />
    </div>
  );
}
