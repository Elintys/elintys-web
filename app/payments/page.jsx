"use client";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PaymentsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Paiements</h1>
        <div className="space-y-2">
          <a href="/payments/checkout" className="text-indigo-600 hover:underline">
            Acheter un billet
          </a>
          <a href="/payments/revenue" className="text-indigo-600 hover:underline">
            Revenus organisateur
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
