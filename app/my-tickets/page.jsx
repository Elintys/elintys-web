"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { fetchTickets } from "../store/slices/ticketsSlice";
import { selectAuthUser } from "../store/authSelectors";
import { isTicketVisibleForUser } from "../store/ticketUtils";

export default function MyTicketsPage() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.list);
  const authUser = useSelector(selectAuthUser);

  const userTickets = useMemo(() => {
    return tickets.filter((ticket) => isTicketVisibleForUser(ticket, authUser));
  }, [tickets, authUser]);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes billets</h1>
        <div className="space-y-3">
          {userTickets.map((ticket) => (
            <div
              key={ticket._id || ticket.qrCode}
              className="bg-white rounded-xl shadow p-4 border border-gray-100"
            >
              <p className="text-sm text-gray-600">Event: {ticket.eventId}</p>
              <p className="text-xs text-gray-400">Status: {ticket.status}</p>
              <p className="text-xs text-gray-400">QR: {ticket.qrCode}</p>
            </div>
          ))}
          {!userTickets.length && (
            <p className="text-gray-500">Aucun billet disponible.</p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
