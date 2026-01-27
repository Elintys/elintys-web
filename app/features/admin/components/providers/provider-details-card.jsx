import AdminCard from "../admin-card";
import AdminStatusPill from "../admin-status-pill";

const ProviderDetailsCard = ({ provider, onClose, onSuspendService, t }) => {
  if (!provider) return null;

  return (
    <AdminCard
      title={t("Details prestataire")}
      subtitle={provider.name}
      action={
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold text-slate-500 hover:text-slate-700"
        >
          {t("Fermer")}
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div>
          <p className="text-xs uppercase text-slate-400">{t("Profil public")}</p>
          <p className="mt-2 text-sm text-slate-700">{provider.email}</p>
          <p className="text-sm text-slate-700">
            {t("Statut")}: {provider.status}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-400">{t("Historique reservations")}</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {provider.reservations.length ? (
              provider.reservations.map((reservation) => <li key={reservation}>{reservation}</li>)
            ) : (
              <li className="text-slate-500">{t("Historique a brancher")}</li>
            )}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-400">{t("Avis & notes")}</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {provider.reviews.length ? (
              provider.reviews.map((review) => <li key={review}>{review}</li>)
            ) : (
              <li className="text-slate-500">{t("Avis a brancher")}</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase text-slate-400">{t("Services proposes")}</p>
        <div className="mt-3 space-y-2">
          {provider.services.map((service) => (
            <div
              key={service.serviceId || service.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium text-slate-800">{service.title}</p>
                <p className="text-xs text-slate-500">
                  {service.category} · {service.pricing?.model || t("Tarif")}{" "}
                  {service.pricing?.amount != null ? `- ${service.pricing.amount}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <AdminStatusPill status={service.isActive ? "ACTIVE" : "SUSPENDED"} />
                <button
                  type="button"
                  onClick={() => onSuspendService(service.serviceId)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {service.isActive ? t("Suspendre") : t("Reactiver")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminCard>
  );
};

export default ProviderDetailsCard;
