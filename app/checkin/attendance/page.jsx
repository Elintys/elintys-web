"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import { fetchTickets } from "../../store/slices/ticketsSlice";

export default function AttendancePage() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.list);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const total = tickets.length;
  const used = tickets.filter((ticket) => ticket.status === "used").length;

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Presences</h1>
        <div className="bg-white rounded-xl shadow p-6 space-y-2 max-w-md">
          <p className="text-sm text-gray-600">Total billets: {total}</p>
          <p className="text-sm text-gray-600">Billets utilises: {used}</p>
          <p className="text-sm text-gray-600">Restants: {total - used}</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
