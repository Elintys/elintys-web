"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const STORAGE_KEY = "elyntisTicketTypes";

function loadTypes() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveTypes(types) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(types));
}

export default function TicketTypesPage() {
  const [types, setTypes] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [access, setAccess] = useState("");

  useEffect(() => {
    setTypes(loadTypes());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = [...types, { id: Date.now().toString(), name, price, access }];
    setTypes(next);
    saveTypes(next);
    setName("");
    setPrice("");
    setAccess("");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Types de billets</h1>
            <div className="space-y-3">
              {types.map((type) => (
                <div
                  key={type.id}
                  className="bg-white rounded-xl shadow p-4 border border-gray-100"
                >
                  <h2 className="text-lg font-semibold text-gray-800">{type.name}</h2>
                  <p className="text-sm text-gray-600">Prix: {type.price || "-"}</p>
                  <p className="text-xs text-gray-400">Acces: {type.access || "-"}</p>
                </div>
              ))}
              {!types.length && (
                <p className="text-gray-500">Aucun type defini.</p>
              )}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 space-y-3 h-fit"
          >
            <h2 className="text-lg font-semibold text-gray-800">Ajouter un type</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Prix"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              placeholder="Acces (VIP, standard)"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
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
