"use client";

import { useState } from "react";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";

export default function AnalyticsInsightsPage() {
  const [prompt, setPrompt] = useState("");
  const [insight, setInsight] = useState("");

  const handleGenerate = () => {
    setInsight("Analyse IA: augmentez la promotion 2 semaines avant l'evenement pour booster la presence.");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Analyses IA</h1>
        <div className="bg-white rounded-xl shadow p-6 space-y-4 max-w-xl">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Decrivez votre objectif"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            rows={4}
          />
          <button
            type="button"
            onClick={handleGenerate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Generer une analyse
          </button>
          {insight && <p className="text-sm text-gray-600">{insight}</p>}
        </div>
      </section>
      <Footer />
    </main>
  );
}
