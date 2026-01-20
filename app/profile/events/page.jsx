"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, fetchEventsByUser } from "../../store/slices/eventsSlice";
import { getFavorites } from "../../components/lib/favorites";
import EventCard from "../../components/EventCard";
import RoleGuard from "../../components/RoleGuard";
import { ROLES, hasRole, getUserId } from "../../store/roleUtils";
import { useLanguage } from "../../i18n/LanguageProvider";

export default function ProfileEventsPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const events = useSelector((state) => state.events.list);
  const { t } = useLanguage();

  useEffect(() => {
    if (hasRole(currentUser, ROLES.ORGANIZER)) {
      const userId = getUserId(currentUser);
      if (userId) {
        dispatch(fetchEventsByUser(userId));
        return;
      }
    }
    dispatch(fetchEvents());
  }, [dispatch, currentUser]);

  const organizerEvents = useMemo(() => {
    if (!getUserId(currentUser)) return [];
    return events.filter(
      (event) =>
        (event?.organizer?._id || event?.organizerId || event?.organizer) ===
        getUserId(currentUser)
    );
  }, [events, currentUser]);

  const favoriteEvents = useMemo(() => {
    const favs = getFavorites();
    return events.filter((event) => favs.includes(event._id));
  }, [events]);

  return (
    <RoleGuard
      requiredRoles={[ROLES.USER, ROLES.ORGANIZER]}
      title="Acces restreint"
      description="Vous devez etre connecte pour acceder a vos evenements."
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-xl font-semibold text-gray-900">{t("Mes evenements")}</h2>
          {hasRole(currentUser, ROLES.ORGANIZER) && (
            <Link
              href="/events/new"
              className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
            >
              {t("Creer un evenement")}
            </Link>
          )}
        </div>

        {hasRole(currentUser, ROLES.ORGANIZER) ? (
          <div className="space-y-4">
            <h3 className="text-sm uppercase text-gray-400 tracking-wide">
              {t("Evenements crees")}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {organizerEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
              {!organizerEvents.length && (
                <p className="text-sm text-gray-500">
                  {t("Aucun evenement cree pour le moment.")}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm uppercase text-gray-400 tracking-wide">
              {t("Evenements favoris")}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {favoriteEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
              {!favoriteEvents.length && (
                <p className="text-sm text-gray-500">{t("Aucun favori pour le moment.")}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
