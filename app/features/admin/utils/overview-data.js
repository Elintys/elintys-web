export const alertActionLabels = {
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

export const mockOverview = {
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

export const buildUserRegistrations = (totalUsers, activeUsers) => {
  const baseSeries = mockCharts.userRegistrations;
  const maxBase = Math.max(...baseSeries, 1);
  const targetPeak = Math.max(Math.round(totalUsers / 12), 1);
  const activityBoost = Math.min(
    Math.max(activeUsers / Math.max(totalUsers, 1), 0.2),
    1
  );
  return baseSeries.map((value, index) => {
    const scaled = (value / maxBase) * targetPeak * (0.8 + activityBoost * 0.4);
    return Math.max(1, Math.round(scaled + index));
  });
};

export const buildEventsByStatus = (totalEvents, publishedEvents, pendingEvents) => {
  const published = Math.max(publishedEvents, 0);
  const pending = Math.max(pendingEvents, 0);
  const rejected = Math.max(totalEvents - published - pending, 0);
  return [
    { label: "Publies", value: published },
    { label: "En attente", value: pending },
    { label: "Refuses", value: rejected },
  ];
};

export const buildEventsByCategory = (totalEvents) => {
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
};
