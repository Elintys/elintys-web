import AdminBadge from "../admin-badge";
import { alertActionLabels } from "../../utils/overview-data";

const OverviewAlerts = ({ alerts, isLoading, t }) => (
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
              <p className="text-sm font-medium text-slate-800">{label}</p>
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
);

export default OverviewAlerts;
