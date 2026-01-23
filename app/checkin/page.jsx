"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getStoredAuth } from "../lib/auth";
import { useTicket } from "../store/slices/ticketsSlice";

export default function CheckInPage() {
  const dispatch = useDispatch();
  const [ticketId, setTicketId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour scanner un billet.");
      return;
    }

    try {
      await dispatch(useTicket(ticketId));
      setMessage("Billet valide et enregistre.");
    } catch (error) {
      console.error("Erreur check-in:", error);
      setMessage("Billet invalide ou deja utilise.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Check-in staff</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg"
        >
          <input
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="ID du billet"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Valider l'entree
          </button>
          {message && <p className="text-sm text-gray-600">{message}</p>}
        </form>
      </section>
      <Footer />
    </main>
  );
}
