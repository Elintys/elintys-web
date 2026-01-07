"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getStoredAuth } from "../components/lib/auth";
import {
  fetchNotifications,
  markNotificationRead,
} from "../store/slices/notificationsSlice";

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.list);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleRead = async (notificationId) => {
    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour mettre a jour.");
      return;
    }

    try {
      await dispatch(markNotificationRead(notificationId));
    } catch (error) {
      console.error("Erreur notification:", error);
      setMessage("Erreur lors de la mise a jour.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>
        <div className="space-y-3">
          {notifications.map((note) => (
            <div
              key={note._id || note.title}
              className="bg-white rounded-xl shadow p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
                  <p className="text-sm text-gray-600">{note.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRead(note._id)}
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Marquer lu
                </button>
              </div>
            </div>
          ))}
          {!notifications.length && (
            <p className="text-gray-500">Aucune notification.</p>
          )}
        </div>
        {message && <p className="text-sm text-gray-600 mt-4">{message}</p>}
      </section>
      <Footer />
    </main>
  );
}
