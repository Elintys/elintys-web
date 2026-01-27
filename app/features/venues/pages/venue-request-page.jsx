"use client";

import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import useVenueRequest from "../hooks/use-venue-request";

export default function VenueRequestPage() {
  const { eventName, setEventName, date, setDate, sent, handleSubmit } = useVenueRequest();

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Demande de reservation</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg"
        >
          <input
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            placeholder="Nom de l'evenement"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
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
