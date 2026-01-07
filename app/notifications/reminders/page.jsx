"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getStoredAuth } from "../../components/lib/auth";
import { createNotification } from "../../store/slices/notificationsSlice";

export default function NotificationRemindersPage() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("reminder");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const auth = getStoredAuth();
    if (!auth?.token) {
      setStatus("Veuillez vous connecter pour envoyer un rappel.");
      return;
    }

    try {
      await dispatch(createNotification({ userId, title, message, type }));
      setStatus("Rappel envoye.");
      setUserId("");
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Erreur creation notification:", error);
      setStatus("Erreur lors de l'envoi.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Rappels invites</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg"
        >
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            rows={4}
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="reminder">Reminder</option>
            <option value="update">Update</option>
            <option value="invitation">Invitation</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Envoyer
          </button>
          {status && <p className="text-sm text-gray-600">{status}</p>}
        </form>
      </section>
      <Footer />
    </main>
  );
}
