"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getStoredAuth } from "../components/lib/auth";
import { createTicket, fetchTickets, useTicket } from "../store/slices/ticketsSlice";
import { selectAuthUser } from "../store/authSelectors";
import { isTicketVisibleForUser } from "../store/ticketUtils";

const initialForm = {
  eventId: "",
  userId: "",
  qrCode: "",
};

export default function TicketsPage() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.list);
  const authUser = useSelector(selectAuthUser);
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const visibleTickets = useMemo(() => {
    return tickets.filter((ticket) => isTicketVisibleForUser(ticket, authUser));
  }, [tickets, authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour creer un billet.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        qrCode: formData.qrCode || `QR-${Date.now().toString(36)}`,
      };
      await dispatch(createTicket(payload));
      setFormData(initialForm);
      setMessage("Billet cree.");
    } catch (error) {
      console.error("Erreur creation billet:", error);
      setMessage("Erreur lors de la creation.");
    } finally {
      setLoading(false);
    }
  };

  const handleUse = async (ticketId) => {
    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour valider un billet.");
      return;
    }

    try {
      await dispatch(useTicket(ticketId));
      setMessage("Billet valide.");
    } catch (error) {
      console.error("Erreur validation billet:", error);
      setMessage("Erreur lors de la validation.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Billets</h1>
            <div className="space-y-3">
              {visibleTickets.map((ticket) => (
                <div
                  key={ticket._id || ticket.qrCode}
                  className="bg-white rounded-xl shadow p-4 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Event: {ticket.eventId}</p>
                      <p className="text-sm text-gray-600">User: {ticket.userId}</p>
                      <p className="text-xs text-gray-400">Status: {ticket.status}</p>
                      <p className="text-xs text-gray-400">QR: {ticket.qrCode}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUse(ticket._id)}
                      className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Valider
                    </button>
                  </div>
                </div>
              ))}
              {!visibleTickets.length && (
                <p className="text-gray-500">Aucun billet disponible.</p>
              )}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 space-y-3 h-fit"
          >
            <h2 className="text-lg font-semibold text-gray-800">Nouveau billet</h2>
            <input
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              placeholder="Event ID"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <input
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="User ID"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <input
              name="qrCode"
              value={formData.qrCode}
              onChange={handleChange}
              placeholder="QR Code"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {loading ? "Creation..." : "Creer"}
            </button>
            {message && (
              <p className="text-sm text-gray-600">{message}</p>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
