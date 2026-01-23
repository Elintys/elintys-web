"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

const STORAGE_KEY = "elyntisProviderQuotes";

function loadQuotes() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveQuotes(quotes) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

export default function ProviderQuotePage() {
  const params = useParams();
  const providerId = params?.id;
  const [eventName, setEventName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!providerId) return;
    const next = [...loadQuotes(), { id: Date.now().toString(), providerId, eventName, message }];
    saveQuotes(next);
    setSent(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Demande de devis</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg"
        >
          <input
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Nom de l'evenement"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Besoin et details"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            rows={4}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Envoyer
          </button>
          {sent && <p className="text-sm text-gray-600">Demande envoyee.</p>}
        </form>
      </section>
      <Footer />
    </main>
  );
}
