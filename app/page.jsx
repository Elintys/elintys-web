// app/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventCard from "./components/EventCard";
import LoginPromptModal from "./components/LoginPromptModal";
import { fetchEvents } from "./store/slices/eventsSlice";
import { fetchCategories } from "./store/slices/categoriesSlice";
import { fetchCurrentUser } from "./store/slices/usersSlice";
import { ROLES, hasRole } from "./store/roleUtils";
import { useLanguage } from "./i18n/LanguageProvider";
import { getStoredAuth } from "./components/lib/auth";

const formatMonth = (dateValue, locale) =>
  new Date(dateValue).toLocaleDateString(locale, { month: "short" }).toUpperCase();

const formatDay = (dateValue, locale) =>
  new Date(dateValue).toLocaleDateString(locale, { day: "2-digit" });

const formatTime = (dateValue, locale) =>
  new Date(dateValue).toLocaleTimeString(locale, { timeStyle: "short" });

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const events = useSelector((state) => state.events.list);
  const categories = useSelector((state) => state.categories.list);
  const currentUser = useSelector((state) => state.users.current);
  const auth = useSelector((state) => state.auth);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { language, t } = useLanguage();
  const locale = language === "en" ? "en-US" : "fr-FR";

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchCategories());
    // dispatch(fetchCurrentUser());
  }, [dispatch]);

  const popularEvents = useMemo(() => events.slice(0, 6), [events]);
  const onlineEvents = useMemo(
    () => events?.filter((event) => event.isOnline || event.isVirtual).slice(0, 6),
    [events]
  );
  const trendingEvents = useMemo(() => events.slice(6, 12), [events]);
  const storedAuth = typeof window !== "undefined" ? getStoredAuth() : null;
  const isAuthenticated = Boolean(auth?.token || storedAuth?.token);

  const handleBecomeOrganizer = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    router.push("/profile/access");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <LoginPromptModal
        open={showLoginModal}
        onConfirm={() => router.push("/login")}
        title="Connexion requise"
        message="Vous devez d'abord vous connecter pour continuer. Redirection vers la page de connexion."
      />

      <section className="relative overflow-hidden">
        <div
          className="min-h-[420px] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/image.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/40 to-transparent" />
          <div className="relative container mx-auto px-4 py-16 text-white">
            <h1 className="text-4xl md:text-5xl font-bold max-w-2xl">
              {t("Ne ratez pas vos prochains evenements.")}
            </h1>
            <p className="mt-4 text-base md:text-lg max-w-2xl text-gray-100">
              {t(
                "Explorez les evenements, lieux et prestataires qui feront vibrer votre communaute."
              )}
            </p>
            <div className="mt-8 bg-white rounded-2xl shadow border border-gray-100 p-3 flex flex-col md:flex-row gap-3 text-gray-700 max-w-3xl">
              <div className="flex items-center gap-2 flex-1 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path d="M10 2a8 8 0 1 0 5.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("Rechercher un evenement, une categorie, un lieu")}
                  className="w-full py-3 outline-none text-sm text-gray-700"
                />
              </div>
              <div className="flex items-center gap-2 px-3 border-t md:border-t-0 md:border-l border-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                </svg>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t("Ville")}
                  className="w-full py-3 outline-none text-sm text-gray-700"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Link
                  href="/events"
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition text-center"
                >
                  {t("Explorer")}
                </Link>
                {hasRole(currentUser, ROLES.ORGANIZER) ? (
                  <Link
                    href="/events/new"
                    className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition text-center"
                  >
                    {t("Creer un evenement")}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleBecomeOrganizer}
                    className="px-6 py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold text-sm hover:bg-yellow-300 transition text-center"
                  >
                    {t("Devenir organisateur")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 space-y-12">
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("Explorer les categories")}
            </h2>
            <Link href="/categories" className="text-sm text-indigo-600 hover:underline">
              {t("Voir tout")}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories.slice(0, 6)?.map((category) => (
              <Link
                key={category._id || category.name}
                href="/events"
                className="bg-white rounded-2xl shadow border border-gray-100 p-4 flex flex-col items-center text-center hover:shadow-md transition"
              >
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-indigo-600 font-semibold">
                  {(category.name || "CAT").slice(0, 2)?.toUpperCase()}
                </div>
                <p className="mt-3 text-sm text-gray-600">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t("Evenements populaires")}</h2>
            <Link href="/events" className="text-sm text-indigo-600 hover:underline">
              {t("Voir plus")}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {popularEvents.map((event) => {
              const eventDate = event.startDate ? new Date(event.startDate) : null;
              const coverImage =
                event.coverImageUrl || event.imageUrl || event.image || "/images/image.png";
              const categoryLabel =
                event.category?.name || event.categoryName || event.category || event.categoryId;
              const locationLabel =
                event?.manualVenue?.city ||
                event?.manualVenue?.name ||
                event?.venue?.city ||
                event?.venue?.name ||
                event?.location ||
                t("Lieu a confirmer");
              return (
                <Link
                  key={event._id}
                  href={`/events/${event._id}`}
                  className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={coverImage}
                      alt={event.title}
                      className="h-44 w-full object-cover"
                    />
                    {categoryLabel && (
                      <span className="absolute left-3 bottom-3 bg-yellow-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded">
                        {categoryLabel}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex gap-4">
                    <div className="text-center min-w-[44px]">
                      <p className="text-xs text-indigo-600 font-semibold">
                        {eventDate ? formatMonth(event.startDate, locale) : t("DATE")}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {eventDate ? formatDay(event.startDate, locale) : "--"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-gray-900 leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {locationLabel}
                      </p>
                      {eventDate && (
                        <p className="text-xs text-gray-500">
                          {formatTime(event.startDate, locale)}
                          {event.endDate ? ` - ${formatTime(event.endDate, locale)}` : ""}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("Decouvrir les evenements en ligne")}
            </h2>
            <Link href="/events" className="text-sm text-indigo-600 hover:underline">
              {t("Voir plus")}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {(onlineEvents.length ? onlineEvents : popularEvents).map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>

        <div className="bg-yellow-400 rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t("Des recommandations pour vous")}
            </h2>
            <p className="text-sm text-gray-700 mt-2">
              {t("Recevez des suggestions adaptees a vos centres d'interet.")}
            </p>
          </div>
          <Link
            href="/recommendations"
            className="px-6 py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
          >
            {t("Demarrer")}
          </Link>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("Tendances autour de vous")}
            </h2>
            <Link href="/events" className="text-sm text-indigo-600 hover:underline">
              {t("Voir plus")}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {trendingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-white">
          <div>
            <h2 className="text-2xl font-bold">{t("Creer un evenement avec Elyntis")}</h2>
            <p className="text-sm text-gray-300 mt-2">
              {t("Publiez vos evenements, trouvez des lieux et collaborez avec des prestataires.")}
            </p>
          </div>
          {hasRole(currentUser, ROLES.ORGANIZER) ? (
            <Link
              href="/events/new"
              className="px-6 py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition"
            >
              {t("Creer un evenement")}
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleBecomeOrganizer}
              className="px-6 py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition"
            >
              {t("Devenir organisateur")}
            </button>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
