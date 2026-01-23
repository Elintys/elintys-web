"use client";

import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function AdminRulesPage() {
  const [rules, setRules] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setStatus("Regles mises a jour.");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Regles & contenus</h1>
        <form
          onSubmit={handleSave}
          className="bg-white rounded-xl shadow p-6 space-y-4 max-w-xl"
        >
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder="Mettre a jour les regles de la plateforme"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            rows={6}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Enregistrer
          </button>
          {status && <p className="text-sm text-gray-600">{status}</p>}
        </form>
      </section>
      <Footer />
    </main>
  );
}
