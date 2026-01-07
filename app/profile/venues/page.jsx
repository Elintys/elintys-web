"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchVenues } from "../../store/slices/venuesSlice";
import RoleGuard from "../../components/RoleGuard";
import { ROLES } from "../../store/roleUtils";

export default function ProfileVenuesPage() {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.venues.list);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  return (
    <RoleGuard
      requiredRoles={[ROLES.LANDLORD]}
      title="Acces restreint"
      description="Ce module est reserve aux proprietaires d'espaces."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Mes espaces</h2>
          <Link
            href="/venues"
            className="text-sm text-indigo-600 hover:underline"
          >
            Gerer les lieux
          </Link>
        </div>
        <div className="grid gap-4">
          {venues.map((venue) => (
            <div
              key={venue._id || venue.name}
              className="bg-white rounded-2xl shadow border border-gray-100 p-5"
            >
              <h3 className="text-lg font-semibold text-gray-900">{venue.name}</h3>
              <p className="text-sm text-gray-500">
                {venue.city || ""} {venue.country || ""}
              </p>
              <Link
                href={`/venues/${venue._id}`}
                className="text-sm text-indigo-600 hover:underline"
              >
                Voir le lieu
              </Link>
            </div>
          ))}
          {!venues.length && (
            <p className="text-sm text-gray-500">Aucun espace liste pour le moment.</p>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
