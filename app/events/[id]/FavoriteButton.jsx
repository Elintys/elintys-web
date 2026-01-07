"use client";

import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../../components/lib/favorites";

export default function FavoriteButton({ eventId }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(eventId));
  }, [eventId]);

  const handleToggle = () => {
    const next = toggleFavorite(eventId);
    setFavorite(next.includes(eventId));
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
        favorite
          ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    </button>
  );
}
