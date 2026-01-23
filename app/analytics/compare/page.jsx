"use client";

import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function AnalyticsComparePage() {
  const [eventA, setEventA] = useState("");
  const [eventB, setEventB] = useState("");

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Comparer des evenements</h1>
        <div className="bg-white rounded-xl shadow p-6 space-y-4 max-w-xl">
          <input
            value={eventA}
            onChange={(e) => setEventA(e.target.value)}
            placeholder="ID evenement A"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            value={eventB}
            onChange={(e) => setEventB(e.target.value)}
            placeholder="ID evenement B"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <div className="text-sm text-gray-600">
            Comparez les taux de presence, ventes et satisfaction.
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
