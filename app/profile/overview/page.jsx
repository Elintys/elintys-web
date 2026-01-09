"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { fetchEvents } from "../../store/slices/eventsSlice";
import { fetchTickets } from "../../store/slices/ticketsSlice";
import { fetchNotifications } from "../../store/slices/notificationsSlice";
import { fetchVenues } from "../../store/slices/venuesSlice";
import { getFavorites } from "../../components/lib/favorites";
import EventCard from "../../components/EventCard";
import { ROLES, hasRole, getUserId } from "../../store/roleUtils";
import { isTicketVisibleForUser } from "../../store/ticketUtils";

export default function ProfileOverviewPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const events = useSelector((state) => state.events.list);
  const tickets = useSelector((state) => state.tickets.list);
  const notifications = useSelector((state) => state.notifications.list);
  const venues = useSelector((state) => state.venues.list);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const favoritesRef = useRef(null);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchTickets());
    dispatch(fetchNotifications());
    dispatch(fetchVenues());
  }, [dispatch]);

  useEffect(() => {
    setFavoriteIds(getFavorites());
  }, []);

  const organizerEvents = useMemo(() => {
    if (!getUserId(currentUser)) return [];
    return events.filter(
      (event) =>
        (event?.organizer?._id || event?.organizerId || event?.organizer) ===
        getUserId(currentUser)
    );
  }, [events, currentUser]);

  const visibleTickets = useMemo(() => {
    return tickets.filter((ticket) =>
      isTicketVisibleForUser(ticket, currentUser)
    );
  }, [tickets, currentUser]);

  const favoriteEvents = useMemo(() => {
    return events.filter((event) => favoriteIds.includes(event._id));
  }, [events, favoriteIds]);

  const scrollFavoritesBy = (delta) => {
    if (!favoritesRef.current) return;
    favoritesRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  const upcomingEvents = useMemo(() => {
    return events
      .filter(
        (event) => event.startDate && new Date(event.startDate) >= new Date()
      )
      .slice(0, 3);
  }, [events]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
          <h3 className="text-sm text-gray-500">Prochains evenements</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {upcomingEvents.length}
          </p>
          <Link
            href="/profile/events"
            className="text-sm text-indigo-600 hover:underline"
          >
            Voir mes evenements
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
          <h3 className="text-sm text-gray-500">Billets</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {visibleTickets.length}
          </p>
          <div className="flex items-center justify-between mt-3">
            <Link
              href="/profile/tickets"
              className="text-sm text-indigo-600 hover:underline"
            >
              Acceder a mes billets
            </Link>
            {visibleTickets.length > 0 && (
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
                QR
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
          <h3 className="text-sm text-gray-500">Notifications recentes</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {notifications.length}
          </p>
          <Link
            href="/profile/notifications"
            className="text-sm text-indigo-600 hover:underline"
          >
            Voir les notifications
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
          <h3 className="text-sm text-gray-500">Actions rapides</h3>
          <div className="flex flex-col gap-2 mt-3 text-sm text-gray-600">
            <Link href="/events" className="hover:text-indigo-600">
              Rechercher un evenement
            </Link>
            <Link href="/profile/tickets" className="hover:text-indigo-600">
              Voir mes billets
            </Link>
          </div>
        </div>
      </div>

      {hasRole(currentUser, ROLES.ORGANIZER) && (
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Espace organisateur
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Suivez vos evenements et publiez de nouvelles experiences.
              </p>
            </div>
            <Link
              href="/events/new"
              className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
            >
              Creer un evenement
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-4 mt-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Evenements crees</p>
              <p className="text-xl font-semibold text-gray-900 mt-2">
                {organizerEvents.length}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Evenements a venir</p>
              <p className="text-xl font-semibold text-gray-900 mt-2">
                {
                  organizerEvents.filter(
                    (event) =>
                      event.startDate && new Date(event.startDate) >= new Date()
                  ).length
                }
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Participants aujourd'hui</p>
              <p className="text-xl font-semibold text-gray-900 mt-2">-</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Revenus</p>
              <p className="text-xl font-semibold text-gray-900 mt-2">-</p>
            </div>
          </div>
        </div>
      )}

      {hasRole(currentUser, ROLES.PROVIDER) && (
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Prestataire</h3>
          <p className="text-sm text-gray-500 mt-2">
            Gerer vos services et repondre aux demandes.
          </p>
          <Link
            href="/profile/services"
            className="mt-4 inline-flex text-sm text-indigo-600 hover:underline"
          >
            Voir mes services
          </Link>
        </div>
      )}

      {hasRole(currentUser, ROLES.LANDLORD) && (
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Proprietaire d'espaces
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Vos espaces listes : {venues.length}
          </p>
          <Link
            href="/profile/venues"
            className="mt-4 inline-flex text-sm text-indigo-600 hover:underline"
          >
            Voir mes espaces
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Prochains evenements
          </h3>
          <div className="mt-4 space-y-3">
            {upcomingEvents.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event._id}`}
                className="flex items-center justify-between text-sm text-gray-600 hover:text-indigo-600"
              >
                <span>{event.title}</span>
                <span>
                  {new Date(event.startDate).toLocaleDateString("fr-FR")}
                </span>
              </Link>
            ))}
            {!upcomingEvents.length && (
              <p className="text-sm text-gray-500">Aucun evenement a venir.</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Notifications recentes
          </h3>
          <div className="mt-4 space-y-3">
            {notifications.slice(0, 3).map((notification) => (
              <div
                key={notification._id || notification.message}
                className="text-sm"
              >
                <p className="text-gray-700">{notification.message}</p>
                <p className="text-xs text-gray-400">
                  {notification.type || "Info"}
                </p>
              </div>
            ))}
            {!notifications.length && (
              <p className="text-sm text-gray-500">
                Aucune notification recente.
              </p>
            )}
          </div>
          <Link
            href="/profile/notifications"
            className="text-sm text-indigo-600 hover:underline mt-3 inline-flex"
          >
            Voir toutes les notifications
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Favoris</h3>
        </div>
        <div className="relative mt-4">
          <button
            type="button"
            onClick={() => scrollFavoritesBy(-400)}
            className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white/90 text-gray-600 shadow-sm hover:bg-white disabled:opacity-40"
            aria-label="Defiler vers la gauche"
            disabled={!favoriteEvents.length}
          >
            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <div
            ref={favoritesRef}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
          >
            {favoriteEvents.map((event) => (
              <div
                key={event._id}
                className="min-w-[380px] max-w-[460px] snap-start"
              >
                <EventCard event={event} />
              </div>
            ))}
            {!favoriteEvents.length && (
              <p className="text-sm text-gray-500">
                Aucun evenement en favori.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => scrollFavoritesBy(400)}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white/90 text-gray-600 shadow-sm hover:bg-white disabled:opacity-40"
            aria-label="Defiler vers la droite"
            disabled={!favoriteEvents.length}
          >
            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
