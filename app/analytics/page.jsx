"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Statistiques</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Taux de presence</p>
            <p className="text-2xl font-semibold text-gray-800">78%</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Billets vendus</p>
            <p className="text-2xl font-semibold text-gray-800">420</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Satisfaction</p>
            <p className="text-2xl font-semibold text-gray-800">4.6/5</p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <a href="/analytics/compare" className="text-indigo-600 hover:underline">Comparer des evenements</a>
          <a href="/analytics/insights" className="text-indigo-600 hover:underline">Analyses IA</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
