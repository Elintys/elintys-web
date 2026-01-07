// app/events/[id]/page.jsx
"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import FavoriteButton from "./FavoriteButton";
import { fetchEventById, fetchEvents } from "../../store/slices/eventsSlice";
import { fetchCurrentUser } from "../../store/slices/usersSlice";
import { ROLES, hasRole, getUserId } from "../../store/roleUtils";

const formatDateRange = (startDate, endDate) => {
  if (!startDate) return "Date non spécifiée";
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  const day = start.toLocaleDateString("fr-FR", { dateStyle: "full" });
  const startTime = start.toLocaleTimeString("fr-FR", { timeStyle: "short" });
  if (!end) return `${day} · ${startTime}`;
  const endTime = end.toLocaleTimeString("fr-FR", { timeStyle: "short" });
  return `${day} · ${startTime} - ${endTime}`;
};

const getOrganizerName = (organizer) =>
  organizer?.name ||
  [organizer?.firstName, organizer?.lastName].filter(Boolean).join(" ") ||
  "Organisateur";

const getOrganizerId = (event) =>
  event?.organizer?._id ||
  event?.organizerId ||
  event?.organizer ||
  event?.createdBy ||
  null;

export default function EventDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params?.id;
  const event = useSelector((state) => state.events.current);
  const events = useSelector((state) => state.events.list);
  const currentUser = useSelector((state) => state.users.current);

  useEffect(() => {
    if (!eventId) return;
    dispatch(fetchEventById(eventId));
    dispatch(fetchCurrentUser());
  }, [dispatch, eventId]);

  useEffect(() => {
    if (!events.length) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  const similarEvents = useMemo(() => {
    if (!event?.category) return [];
    return events
      .filter((item) => item?._id !== eventId && item?.category === event.category)
      .slice(0, 3);
  }, [events, event, eventId]);

  const isOwner =
    hasRole(currentUser, ROLES.ORGANIZER) &&
    getOrganizerId(event) &&
    getOrganizerId(event) === getUserId(currentUser);

  if (!event) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <section className="container mx-auto px-4 py-10">
          <p className="text-gray-500">Evenement introuvable.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
              <img
                src={event.image || "/images/image.png"}
                alt={event.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  {event.category && (
                    <span className="px-3 py-1 bg-gray-100 rounded-full">{event.category}</span>
                  )}
                  <span>{formatDateRange(event.startDate, event.endDate)}</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mt-4">{event.title}</h1>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  {event.description || "Aucune description disponible pour cet evenement."}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <FavoriteButton eventId={eventId} />
                  {isOwner && (
                    <>
                      <Link
                        href={`/events/${eventId}/edit`}
                        className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition"
                      >
                        Modifier
                      </Link>
                      <Link
                        href={`/events/${eventId}/collaborators`}
                        className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition"
                      >
                        Collaborateurs
                      </Link>
                    </>
                  )}
                  <Link
                    href="/tickets"
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
                  >
                    Obtenir un billet
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Date et heure</h2>
                <p className="text-gray-600 mt-2">
                  {formatDateRange(event.startDate, event.endDate)}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Lieu</h2>
                <p className="text-gray-600 mt-2">{event?.venue?.name || "Non spécifié"}</p>
                <p className="text-sm text-gray-500">
                  {event?.venue?.address || "Adresse non spécifiée"}{" "}
                  {event?.venue?.city ? `, ${event.venue.city}` : ""}{" "}
                  {event?.venue?.country || ""}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Organisateur</h2>
                <p className="text-gray-600 mt-2">{getOrganizerName(event?.organizer)}</p>
              </div>
            </div>

            {Array.isArray(event?.tags) && event.tags.length > 0 && (
              <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {event.tags.map((tag) => (
                    <span
                      key={tag._id || tag.id || tag}
                      className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full"
                    >
                      {tag.text || tag.name || tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Evenements similaires
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {similarEvents.map((item) => (
                  <Link
                    key={item._id}
                    href={`/events/${item._id}`}
                    className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden hover:shadow-md transition"
                  >
                    <img
                      src={item.image || "/images/image.png"}
                      alt={item.title}
                      className="h-32 w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      {item.startDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.startDate).toLocaleDateString("fr-FR", {
                            dateStyle: "medium",
                          })}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
                {!similarEvents.length && (
                  <p className="text-gray-500">
                    Aucun evenement similaire pour le moment.
                  </p>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Billets</h3>
              <p className="text-sm text-gray-500 mt-2">
                Reservez votre place pour cet evenement.
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Prix</span>
                  <span className="font-semibold text-gray-900">
                    {event.price ? `${event.price} ${event.currency || "CAD"}` : "Gratuit / Sur place"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Places restantes</span>
                  <span className="font-semibold text-gray-900">
                    {event.capacity || "—"}
                  </span>
                </div>
              </div>
              <Link
                href="/tickets"
                className="mt-6 block w-full text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
              >
                Obtenir un billet
              </Link>
              <p className="text-xs text-gray-400 mt-3">
                Conditions de remboursement et d&apos;accès selon l&apos;organisateur.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Partager</h3>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50"
                >
                  Copier le lien
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
