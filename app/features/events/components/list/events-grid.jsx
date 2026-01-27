import EventListCard from "./event-list-card";

export default function EventsGrid({ events, locale, t }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventListCard key={event._id} event={event} locale={locale} t={t} />
      ))}
      {!events.length && <p className="text-gray-500">{t("Aucun evenement trouve.")}</p>}
    </div>
  );
}
