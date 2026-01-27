"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import EventCard from "../components/ui/event-card";
import { getFavorites, getPreferences } from "../lib/favorites";
import { fetchEvents } from "../store/slices/eventsSlice";
import { fetchCategories } from "../store/slices/categoriesSlice";

export default function RecommendationsPage() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.list);
  const categories = useSelector((state) => state.categories.list);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchCategories());
  }, [dispatch]);

  const recommended = useMemo(() => {
    const prefs = getPreferences();
    const favs = getFavorites();
    const favoriteEvents = events.filter((event) => favs.includes(event._id));
    const favoriteCategoryIds = favoriteEvents
      .map((event) => event.categoryId)
      .filter(Boolean);

    return events.filter((event) => {
      if (prefs.categoryId && event.categoryId === prefs.categoryId) return true;
      if (favoriteCategoryIds.includes(event.categoryId)) return true;
      if (prefs.query && event.title?.toLowerCase().includes(prefs.query.toLowerCase())) return true;
      return false;
    });
  }, [events]);

  const categoryLabel = (categoryId) =>
    categories.find((cat) => cat._id === categoryId)?.name || "";

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Recommandations</h1>
        <p className="text-gray-600 mb-6">
          Suggestions basees sur vos preferences et favoris.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {recommended.map((event) => (
            <div key={event._id} className="space-y-2">
              <EventCard event={event} />
              {event.categoryId && (
                <p className="text-xs text-gray-500">
                  Categorie: {categoryLabel(event.categoryId)}
                </p>
              )}
            </div>
          ))}
          {!recommended.length && (
            <p className="text-gray-500">Aucune recommandation disponible.</p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
