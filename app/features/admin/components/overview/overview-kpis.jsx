import AdminKpiCard from "../admin-kpi-card";

const OverviewKpis = ({ kpis, isLoading, t }) => (
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
);

export default OverviewKpis;
