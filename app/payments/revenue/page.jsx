"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";

const STORAGE_KEY = "elyntisPayments";

function loadPayments() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function RevenuePage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const total = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Revenus</h1>
        <div className="bg-white rounded-xl shadow p-6 max-w-lg space-y-2">
          <p className="text-sm text-gray-600">Total ventes: {total}</p>
          <p className="text-sm text-gray-600">Transactions: {payments.length}</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
