"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import EventCard from "../components/ui/EventCard";
import LoginPromptModal from "../components/ui/LoginPromptModal";
import { getStoredAuth } from "../lib/auth";
import { getFavorites, savePreferences } from "../lib/favorites";
import { fetchEvents } from "../store/slices/eventsSlice";
import { fetchCategories } from "../store/slices/categoriesSlice";
import { fetchCurrentUser } from "../store/slices/usersSlice";
import { ROLES, hasRole } from "../store/roleUtils";
import { useLanguage } from "../i18n/LanguageProvider";

export default function EventsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const events = useSelector((state) => state.events.list);
  const categories = useSelector((state) => state.categories.list);
  const currentUser = useSelector((state) => state.users.current);
  const auth = useSelector((state) => state.auth);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { language, t } = useLanguage();
  const locale = language === "en" ? "en-US" : "fr-FR";

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchCategories());
    // dispatch(fetchCurrentUser());
    setFavorites(getFavorites());
  }, []);

  const storedAuth = typeof window !== "undefined" ? getStoredAuth() : null;
  const isAuthenticated = Boolean(auth?.token || storedAuth?.token);

  const handleBecomeOrganizer = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    router.push("/profile/access");
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (showFavorites && !favorites.includes(event._id)) return false;
      if (query && !event.title?.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      if (categoryId && event.categoryId !== categoryId) return false;
      if (startDate && new Date(event.startDate) < new Date(startDate)) return false;
      if (endDate && new Date(event.startDate) > new Date(endDate)) return false;
      return true;
    });
  }, [events, favorites, showFavorites, query, categoryId, startDate, endDate]);

  const handleSavePreferences = () => {
    savePreferences({ query, categoryId, startDate, endDate });
  };

  const formatMonth = (dateValue) =>
    new Date(dateValue).toLocaleDateString(locale, { month: "short" }).toUpperCase();

  const formatDay = (dateValue) =>
    new Date(dateValue).toLocaleDateString(locale, { day: "2-digit" });

  const formatTime = (dateValue) =>
    new Date(dateValue).toLocaleTimeString(locale, { timeStyle: "short" });

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <LoginPromptModal
        open={showLoginModal}
        onConfirm={() => router.push("/login")}
        title="Connexion requise"
        message="Vous devez d'abord vous connecter pour continuer. Redirection vers la page de connexion."
      />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="flex items-center gap-3 text-gray-500 text-sm mb-6">
          <Link href="/" className="inline-flex items-center gap-2 hover:text-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {t("Retour")}
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("Evenements interessants")}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {t("Rechercher, filtrer et sauvegarder vos evenements preferes.")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/favorites"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
            >
              {t("Favoris")}
            </Link>
            <Link
              href="/recommendations"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
            >
              {t("Recommandations")}
            </Link>
            {hasRole(currentUser, ROLES.ORGANIZER) ? (
              <Link
                href="/events/new"
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                {t("Creer un evenement")}
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleBecomeOrganizer}
                className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full hover:bg-yellow-300 transition"
              >
                {t("Devenir organisateur")}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 mb-6 grid gap-4 md:grid-cols-5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Recherche par titre")}
            className="border border-gray-200 rounded-lg px-3 py-2"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          >
            <option value="">{t("Categorie")}</option>
            {categories.map((cat) => (
              <option key={cat._id || cat.name} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          />
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={showFavorites}
                onChange={(e) => setShowFavorites(e.target.checked)}
              />
              {t("Favoris")}
            </label>
            <button
              type="button"
              onClick={handleSavePreferences}
              className="text-sm text-indigo-600 hover:underline"
            >
              {t("Sauver mes preferences")}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const eventDate = event.startDate ? new Date(event.startDate) : null;
            const month = eventDate ? formatMonth(event.startDate) : t("DATE");
            const day = eventDate ? formatDay(event.startDate) : "--";
            const coverImage =
              event.coverImageUrl || event.imageUrl || event.image || "/images/image.png";
            const categoryLabel =
              event.category?.name || event.categoryName || event.category || event.categoryId;
            const location =
              event?.manualVenue?.city ||
              event?.manualVenue?.name ||
              event?.venue?.city ||
              event?.venue?.name ||
              event?.location ||
              t("Lieu a confirmer");
            const priceLabel = event.price
              ? `${event.price} ${event.currency || "CAD"}`
              : event.isFree
                ? t("Gratuit")
                : t("Prix sur place");
            const interested = event.interestedCount || 0;

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
                  <button
                    type="button"
                    aria-label={t("Ajouter aux favoris")}
                    className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:text-indigo-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4 flex gap-4">
                  <div className="text-center min-w-[44px]">
                    <p className="text-xs text-indigo-600 font-semibold">{month}</p>
                    <p className="text-lg font-bold text-gray-900">{day}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-gray-900 leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-500">{location}</p>
                    {eventDate && (
                      <p className="text-xs text-gray-500">
                        {formatTime(event.startDate)}
                        {event.endDate ? ` - ${formatTime(event.endDate)}` : ""}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path d="M7 2a1 1 0 0 0-1 1v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-1-1zm12 8H5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9z" />
                        </svg>
                        {priceLabel}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 5h-2v6l5 3 1-1.73-4-2.27V7z" />
                        </svg>
                        {interested} {t("interesses")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {!filteredEvents.length && (
            <p className="text-gray-500">{t("Aucun evenement trouve.")}</p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
