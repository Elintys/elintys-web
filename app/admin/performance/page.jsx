"use client";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function AdminPerformancePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Performance plateforme</h1>
        <div className="bg-white rounded-xl shadow p-6 space-y-2 max-w-lg">
          <p className="text-sm text-gray-600">Disponibilite: 99.4%</p>
          <p className="text-sm text-gray-600">Temps de reponse: 240ms</p>
          <p className="text-sm text-gray-600">Erreurs 24h: 3</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
