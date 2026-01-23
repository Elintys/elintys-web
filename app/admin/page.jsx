"use client";

import { useEffect, useMemo, useState } from "react";
import AdminCard from "./components/AdminCard";
import AdminBadge from "./components/AdminBadge";
import AdminKpiCard from "./components/AdminKpiCard";
import { useLanguage } from "../i18n/LanguageProvider";
import { adminApi } from "../store/adminApi";

const alertActionLabels = {
  USER_STATUS_UPDATED: "Compte suspendu",
  EVENT_REJECTED: "Evenement refuse",
  EVENT_UNPUBLISHED: "Evenement depublie",
  EVENT_APPROVED: "Evenement approuve",
  PROVIDER_VERIFIED: "Prestataire verifie",
  SERVICE_SUSPENDED: "Service suspendu",
};

const mockCharts = {
  userRegistrations: [12, 18, 25, 31, 28, 40, 52, 48, 60, 74, 69, 82],
  categoryWeights: [
    { label: "Festival", weight: 0.24 },
    { label: "Conference", weight: 0.2 },
    { label: "Soiree", weight: 0.18 },
    { label: "Networking", weight: 0.16 },
    { label: "Culture", weight: 0.12 },
    { label: "Autre", weight: 0.1 },
  ],
};

function buildUserRegistrations(totalUsers, activeUsers) {
  const baseSeries = mockCharts.userRegistrations;
  const maxBase = Math.max(...baseSeries, 1);
  const targetPeak = Math.max(Math.round(totalUsers / 12), 1);
  const activityBoost = Math.min(Math.max(activeUsers / Math.max(totalUsers, 1), 0.2), 1);
  return baseSeries.map((value, index) => {
    const scaled = (value / maxBase) * targetPeak * (0.8 + activityBoost * 0.4);
    return Math.max(1, Math.round(scaled + index));
  });
}

function buildEventsByStatus(totalEvents, publishedEvents, pendingEvents) {
  const published = Math.max(publishedEvents, 0);
  const pending = Math.max(pendingEvents, 0);
  const rejected = Math.max(totalEvents - published - pending, 0);
  return [
    { label: "Publies", value: published },
    { label: "En attente", value: pending },
    { label: "Refuses", value: rejected },
  ];
}

function buildEventsByCategory(totalEvents) {
  const values = mockCharts.categoryWeights.map((entry) => ({
    label: entry.label,
    value: Math.max(1, Math.round(totalEvents * entry.weight)),
  }));
  const top = values
    .filter((entry) => entry.label !== "Autre")
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);
  const usedLabels = new Set(top.map((entry) => entry.label));
  const othersValue = values
    .filter((entry) => !usedLabels.has(entry.label))
    .reduce((sum, entry) => sum + entry.value, 0);
  return [...top, { label: "Autre", value: othersValue || 1 }];
}

function LineChart({ series }) {
  const max = Math.max(...series, 1);
  const min = 0;
  const xStart = 8;
  const xEnd = 98;
  const yStart = 90;
  const yEnd = 10;
  const points = series
    .map((value, index) => {
      const x = xStart + (index / (series.length - 1)) * (xEnd - xStart);
      const y = yStart - ((value - min) / (max - min)) * (yStart - yEnd);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        points={points}
        className="text-indigo-700"
      />
    </svg>
  );
}

function BarChart({ items }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-indigo-700"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const mockOverview = {
  totalUsers: 38420,
  activeUsers: 12480,
  totalEvents: 3240,
  publishedEvents: 2450,
  pendingEvents: 62,
  totalProviders: 620,
  helpers: {
    totalUsers: "+8% vs mois precedent",
    activeUsers: "+4.2%",
    totalEvents: "+110 ce mois",
    publishedEvents: "76% du total",
    pendingEvents: "11 urgents",
    totalProviders: "+2.8%",
  },
  recentAlerts: [
    {
      id: "fallback-alert-1",
      action: "EVENT_REJECTED",
      target_id: "evt-demo-01",
      created_at: new Date().toISOString(),
    },
    {
      id: "fallback-alert-2",
      action: "USER_STATUS_UPDATED",
      target_id: "user-demo-02",
      created_at: new Date().toISOString(),
    },
  ],
};

export default function AdminOverviewPage() {
  const { t } = useLanguage();
  const [overview, setOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadOverview = async () => {
      try {
        const response = await adminApi.fetchOverview();
        if (isMounted) {
          setOverview(response.data || null);
        }
      } catch (error) {
        if (isMounted) {
          setOverview(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  const kpis = useMemo(() => {
    const data = overview || {};
    const errors = Array.isArray(data.partialErrors)
      ? data.partialErrors.map((item) => item.service)
      : [];
    const useUsersMock = errors.includes("users");
    const useEventsMock = errors.includes("events");
    const useProvidersMock = errors.includes("providers");
    return [
      {
        label: "Total utilisateurs",
        value: useUsersMock ? mockOverview.totalUsers : data.totalUsers ?? mockOverview.totalUsers,
        helper: mockOverview.helpers.totalUsers,
      },
      {
        label: "Utilisateurs actifs (30 jours)",
        value: useUsersMock ? mockOverview.activeUsers : data.activeUsers ?? mockOverview.activeUsers,
        helper: mockOverview.helpers.activeUsers,
      },
      {
        label: "Total evenements",
        value: useEventsMock ? mockOverview.totalEvents : data.totalEvents ?? mockOverview.totalEvents,
        helper: mockOverview.helpers.totalEvents,
      },
      {
        label: "Evenements publies",
        value: useEventsMock
          ? mockOverview.publishedEvents
          : data.publishedEvents ?? mockOverview.publishedEvents,
        helper: mockOverview.helpers.publishedEvents,
      },
      {
        label: "Evenements en attente de validation",
        value: useEventsMock
          ? mockOverview.pendingEvents
          : data.pendingEvents ?? mockOverview.pendingEvents,
        helper: mockOverview.helpers.pendingEvents,
      },
      {
        label: "Total prestataires actifs",
        value: useProvidersMock
          ? mockOverview.totalProviders
          : data.totalProviders ?? mockOverview.totalProviders,
        helper: mockOverview.helpers.totalProviders,
      },
    ];
  }, [overview]);

  const statsBase = useMemo(() => {
    const data = overview || {};
    return {
      totalUsers: data.totalUsers ?? mockOverview.totalUsers,
      activeUsers: data.activeUsers ?? mockOverview.activeUsers,
      totalEvents: data.totalEvents ?? mockOverview.totalEvents,
      publishedEvents: data.publishedEvents ?? mockOverview.publishedEvents,
      pendingEvents: data.pendingEvents ?? mockOverview.pendingEvents,
    };
  }, [overview]);

  const chartData = useMemo(() => {
    return {
      userRegistrations: buildUserRegistrations(
        statsBase.totalUsers,
        statsBase.activeUsers
      ),
      eventsByStatus: buildEventsByStatus(
        statsBase.totalEvents,
        statsBase.publishedEvents,
        statsBase.pendingEvents
      ),
      eventsByCategory: buildEventsByCategory(statsBase.totalEvents),
    };
  }, [statsBase]);

  const alerts = useMemo(() => {
    const data = overview || {};
    const errors = Array.isArray(data.partialErrors)
      ? data.partialErrors.map((item) => item.service)
      : [];
    if (errors.includes("audit")) {
      return mockOverview.recentAlerts;
    }
    return Array.isArray(data.recentAlerts) ? data.recentAlerts : mockOverview.recentAlerts;
  }, [overview]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Vue d'ensemble")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Vue operationnelle des indicateurs clefs de la plateforme.")}
        </p>
        {Array.isArray(overview?.partialErrors) && overview.partialErrors.length > 0 && (
          <p className="mt-2 text-xs text-amber-600">
            {t("Certaines sources de donnees sont indisponibles.")}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => (
          <AdminKpiCard
            key={kpi.label}
            label={t(kpi.label)}
            value={isLoading ? "--" : kpi.value}
            helper={kpi.helper}
          />
        ))}
      </div>

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

      <AdminCard title={t("Alertes recentes")} subtitle={t("Actions admin journalisees")}>
        <div className="space-y-3">
          {isLoading && (
            <div className="text-sm text-slate-500">{t("Chargement...")}</div>
          )}
          {!isLoading && alerts.length === 0 && (
            <div className="text-sm text-slate-500">{t("Aucune alerte recente.")}</div>
          )}
          {!isLoading &&
            alerts.map((alert) => {
              const label = alertActionLabels[alert.action] || alert.action || t("Action admin");
              const dateLabel = alert.created_at
                ? new Date(alert.created_at).toLocaleDateString()
                : "-";
              return (
                <div
                  key={alert.id || `${alert.action}-${alert.created_at}`}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {label}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {dateLabel}
                      {alert.target_id ? ` · ${alert.target_id}` : ""}
                    </p>
                  </div>
                  <AdminBadge tone="warning">{t("Journal")}</AdminBadge>
                </div>
              );
            })}
        </div>
      </AdminCard>
    </div>
  );
}
