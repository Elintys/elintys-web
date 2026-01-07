"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { getFavorites } from "../components/lib/favorites";
import { fetchEvents } from "../store/slices/eventsSlice";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.list);
  const favorites = getFavorites();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const favoriteEvents = events.filter((event) => favorites.includes(event._id));

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes favoris</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {favoriteEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
          {!favoriteEvents.length && (
            <p className="text-gray-500">Aucun evenement favori pour le moment.</p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
