"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const STORAGE_KEY = "elyntisVerification";

function loadVerification() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveVerification(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function VerificationPage() {
  const [docType, setDocType] = useState("");
  const [docId, setDocId] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const saved = loadVerification();
    if (saved) {
      setDocType(saved.docType || "");
      setDocId(saved.docId || "");
      setStatus(saved.status || "En attente");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { docType, docId, status: "En attente" };
    saveVerification(payload);
    setStatus("En attente");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Verification identite</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg"
        >
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          >
            <option value="">Type de document</option>
            <option value="passport">Passeport</option>
            <option value="id">Carte nationale</option>
            <option value="license">Permis</option>
          </select>
          <input
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            placeholder="Numero du document"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Soumettre
          </button>
          {status && <p className="text-sm text-gray-600">Statut: {status}</p>}
        </form>
      </section>
      <Footer />
    </main>
  );
}
