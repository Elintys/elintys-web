"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const STORAGE_KEY = "elyntisServices";

function loadServices() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveServices(services) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}

export default function ServicesManagePage() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setServices(loadServices());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = [...services, { id: Date.now().toString(), name, price, description }];
    setServices(next);
    saveServices(next);
    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes services</h1>
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow p-4 border border-gray-100"
                >
                  <h2 className="text-lg font-semibold text-gray-800">{service.name}</h2>
                  <p className="text-sm text-gray-600">Prix: {service.price || "-"}</p>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
              {!services.length && (
                <p className="text-gray-500">Aucun service publie.</p>
              )}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 space-y-3 h-fit"
          >
            <h2 className="text-lg font-semibold text-gray-800">Ajouter un service</h2>
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
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              rows={3}
            />
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
