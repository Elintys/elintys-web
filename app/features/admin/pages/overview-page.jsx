"use client";

import AdminCard from "../components/admin-card";
import { useLanguage } from "../../../i18n/language-provider";
import useAdminOverview from "../hooks/use-admin-overview";
import LineChart from "../components/overview/line-chart";
import BarChart from "../components/overview/bar-chart";
import OverviewKpis from "../components/overview/overview-kpis";
import OverviewAlerts from "../components/overview/overview-alerts";

export default function AdminOverviewPage() {
  const { t } = useLanguage();
  const { isLoading, partialErrors, kpis, chartData, alerts } = useAdminOverview();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Vue d'ensemble")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Vue operationnelle des indicateurs clefs de la plateforme.")}
        </p>
        {partialErrors.length > 0 && (
          <p className="mt-2 text-xs text-amber-600">
            {t("Certaines sources de donnees sont indisponibles.")}
          </p>
        )}
      </div>

      <OverviewKpis kpis={kpis} isLoading={isLoading} t={t} />

      <div className="grid gap-4 lg:grid-cols-3">
        <AdminCard
          title={t("Evolution des inscriptions")}
          subtitle={t("Courbe utilisateurs par semaine")}
        >
          <div className="h-56 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-400">
            <LineChart series={chartData.userRegistrations} />
          </div>
        </AdminCard>
        <AdminCard
          title={t("Evenements par statut")}
          subtitle={t("Repartition publies, en attente, refuses")}
        >
          <div className="h-56 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <BarChart items={chartData.eventsByStatus} />
          </div>
        </AdminCard>
        <AdminCard
          title={t("Evenements par categorie")}
          subtitle={t("Top categories les plus actives")}
        >
          <div className="h-56 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <BarChart items={chartData.eventsByCategory} />
          </div>
        </AdminCard>
      </div>

      <AdminCard title={t("Alertes recentes")} subtitle={t("Actions admin journalisees")}
      >
        <OverviewAlerts alerts={alerts} isLoading={isLoading} t={t} />
      </AdminCard>
    </div>
  );
}
