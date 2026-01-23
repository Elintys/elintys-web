"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

const getKey = (venueId) => `elyntisVenueAvailability_${venueId}`;

function loadAvailability(venueId) {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(getKey(venueId));
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveAvailability(venueId, dates) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getKey(venueId), JSON.stringify(dates));
}

export default function VenueAvailabilityPage() {
  const params = useParams();
  const venueId = params?.id;
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!venueId) return;
    setDates(loadAvailability(venueId));
  }, [venueId]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!venueId) return;
    if (!date) return;
    const next = [...dates, date];
    setDates(next);
    saveAvailability(venueId, next);
    setDate("");
  };

  const handleRemove = (selected) => {
    if (!venueId) return;
    const next = dates.filter((item) => item !== selected);
    setDates(next);
    saveAvailability(venueId, next);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Disponibilites</h1>
            <div className="space-y-2">
              {dates.map((item) => (
                <div key={item} className="flex items-center justify-between bg-white rounded-xl shadow p-4">
                  <p className="text-sm text-gray-700">{item}</p>
                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Retirer
                  </button>
                </div>
              ))}
              {!dates.length && (
                <p className="text-gray-500">Aucune disponibilite definie.</p>
              )}
            </div>
          </div>
          <form
            onSubmit={handleAdd}
            className="bg-white rounded-xl shadow p-6 space-y-3 h-fit"
          >
            <h2 className="text-lg font-semibold text-gray-800">Ajouter une date</h2>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Ajouter
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
