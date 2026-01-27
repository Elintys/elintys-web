import EventCard from "../../../../components/ui/event-card";

const EventsSection = ({ title, events, emptyMessage, t }) => (
  <div className="space-y-4">
    <h3 className="text-sm uppercase text-gray-400 tracking-wide">{t(title)}</h3>
    <div className="grid md:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
      {!events.length && <p className="text-sm text-gray-500">{t(emptyMessage)}</p>}
    </div>
  </div>
);

export default EventsSection;
