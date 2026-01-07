"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { fetchVenueById } from "../../store/slices/venuesSlice";

const formatValue = (value) => {
  if (value === null || value === undefined) return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

export default function VenueDetailPage() {
  const params = useParams();
  const venueId = params?.id;
  const dispatch = useDispatch();
  const venue = useSelector((state) => state.venues.current);

  useEffect(() => {
    if (!venueId) return;
    dispatch(fetchVenueById(venueId));
  }, [dispatch, venueId]);

  if (!venue) {
    return (
      <main className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <section className="flex-1 container mx-auto px-4 py-10">
          <p className="text-gray-500">Chargement...</p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{venue.name}</h1>
          <p className="text-gray-600">{venue.description}</p>
          <p className="text-sm text-gray-600">
            {venue.address} {venue.city ? `- ${venue.city}` : ""}
          </p>
          <p className="text-sm text-gray-600">Capacite: {venue.capacity || "-"}</p>
          <div className="text-sm text-gray-600 space-y-1">
            {Object.entries(venue || {}).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="text-gray-500 break-all">{formatValue(value)}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Link
              href={`/venues/${venueId}/request`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Demander une reservation
            </Link>
            <Link
              href={`/venues/${venueId}/availability`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Disponibilites
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
