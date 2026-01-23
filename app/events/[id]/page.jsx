"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/layout/Navbar";
import { fetchEventById } from "../../store/slices/eventsSlice";
import { getUserId } from "../../store/roleUtils";
import EventHero from "./components/EventHero";
import EventMeta from "./components/EventMeta";
import EventActions from "./components/EventActions";
import EventDescription from "./components/EventDescription";
import EventVenue from "./components/EventVenue";
import EventProviders from "./components/EventProviders";
import EventTickets from "./components/EventTickets";
import EventOrganizerActions from "./components/EventOrganizerActions";

const formatDateRange = (startDate, endDate, locale) => {
  if (!startDate) return "—";
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  const day = start.toLocaleDateString(locale, { dateStyle: "full" });
  const startTime = start.toLocaleTimeString(locale, { timeStyle: "short" });
  if (!end) return `${day} · ${startTime}`;
  const endTime = end.toLocaleTimeString(locale, { timeStyle: "short" });
  return `${day} · ${startTime} - ${endTime}`;
};

const formatDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return null;
  const diff = Math.max(0, new Date(endDate) - new Date(startDate));
  const minutes = Math.round(diff / 60000);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h${rest}` : `${hours}h`;
};

const ensureMeta = ({ name, property, content }) => {
  if (typeof document === "undefined") return;
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    if (name) tag.setAttribute("name", name);
    if (property) tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content || "");
};

export default function EventDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params?.id;
  const event = useSelector((state) => state.events.current);
  const currentUser = useSelector((state) => state.users.current);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;
    let mounted = true;
    setLoading(true);
    setError("");
    dispatch(fetchEventById(eventId)).then((action) => {
      if (!mounted) return;
      if (fetchEventById.rejected.match(action)) {
        setError(action.payload?.message || "Evenement introuvable.");
      }
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [dispatch, eventId]);

  const locale = currentUser?.locale || "fr-CA";
  const coverImage =
    event?.coverImageUrl || event?.imageUrl || event?.image || "/images/image.png";
  const locationLabel =
    event?.manualVenue?.city ||
    event?.manualVenue?.name ||
    event?.manualVenue?.country ||
    "En ligne";
  const organizerLabel = event?.organizerName || event?.user.displayName || "—";
  const categoryLabel =
    event?.category?.name || event?.categoryName || event?.category || event?.categoryId;
  const durationLabel = formatDuration(event?.startDate, event?.endDate);
  const dateLabel = formatDateRange(event?.startDate, event?.endDate, locale);

  const isOrganizer =
    event?.organizerId && getUserId(currentUser) === String(event.organizerId);

  const tickets = event?.tickets || [];

  useEffect(() => {
    if (!event?.title) return;
    const description = event.description || "";
    document.title = `${event.title} | Elintys`;
    ensureMeta({ name: "description", content: description.slice(0, 160) });
    ensureMeta({ property: "og:title", content: event.title });
    ensureMeta({ property: "og:description", content: description.slice(0, 160) });
    ensureMeta({ property: "og:image", content: coverImage });
  }, [event, coverImage]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <section className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
            Chargement...
          </div>
        </section>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <section className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
            {error || "Evenement introuvable."}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="container mx-auto px-4 py-10 space-y-8">
        <EventHero
          event={event}
          formattedDate={dateLabel}
          locationLabel={locationLabel}
        />

        <EventMeta
          dateLabel={durationLabel ? `${dateLabel} · ${durationLabel}` : dateLabel}
          locationLabel={locationLabel}
          categoryLabel={categoryLabel}
          organizer={organizerLabel}
        />

        <EventActions event={event} hasTickets={tickets.length > 0} />

        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-6">
            <EventDescription description={event.description} />
            <EventVenue venue={event.manualVenue} />
            <EventProviders providers={event.manualProviders} />
            <EventTickets tickets={tickets} />
          </div>
          <aside className="space-y-6">
            {isOrganizer && (
              <EventOrganizerActions eventId={eventId} status={event.status || "—"} />
            )}
            {tickets.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900">Participation</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Participation gratuite
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
