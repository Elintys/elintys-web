"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import apiClient from "../../store/apiClient";

const formatValue = (value) => {
  if (value === null || value === undefined) return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const getProviderName = (provider) =>
  provider?.name || provider?.companyName || provider?.title || "Prestataire";

export default function ProviderDetailPage({ params }) {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiClient.get("/providers/search");
        const providers = res.data || [];
        const match = providers.find(
          (item) => item?._id === params.id || item?.id === params.id
        );
        setProvider(match || null);
      } catch (err) {
        console.error("Erreur chargement prestataire:", err);
        setError("Impossible de charger le prestataire.");
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [params.id]);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{getProviderName(provider)}</h1>
          {loading && <p className="text-gray-500">Chargement...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {provider && (
            <div className="space-y-2 text-sm text-gray-600">
              {Object.entries(provider).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <span className="font-medium text-gray-800">{key}:</span>
                  <span className="text-gray-500 break-all">{formatValue(value)}</span>
                </div>
              ))}
            </div>
          )}
          <Link
            href={`/providers/${params.id}/quote`}
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Demander un devis
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
