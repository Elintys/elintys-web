import AdminCard from "../admin-card";

const EventDetailsCard = ({ event, onClose, t }) => {
  if (!event) return null;

  return (
    <AdminCard
      title={t("Details evenement")}
      subtitle={event.title}
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
          <p className="text-xs uppercase text-slate-400">{t("Donnees principales")}</p>
          <p className="mt-2 text-sm text-slate-700">
            {t("Organisateur")}: {event.organizer}
          </p>
          <p className="text-sm text-slate-700">
            {t("Ville")}: {event.city}
          </p>
          <p className="text-sm text-slate-700">
            {t("Categorie")}: {event.category}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-400">{t("Historique statut")}</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>{event.displayStatus}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-400">{t("Signalements associes")}</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {event.reports.length ? (
              event.reports.map((report) => <li key={report}>{report}</li>)
            ) : (
              <li className="text-slate-500">{t("Aucun signalement")}</li>
            )}
          </ul>
        </div>
      </div>
    </AdminCard>
  );
};

export default EventDetailsCard;
