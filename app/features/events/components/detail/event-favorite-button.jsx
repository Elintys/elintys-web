"use client";

import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../../../lib/favorites";
import { useLanguage } from "../../../i18n/language-provider";

export default function FavoriteButton({ eventId }) {
  const [favorite, setFavorite] = useState(false);
  const { t } = useLanguage();

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
      {favorite ? t("Retirer des favoris") : t("Ajouter aux favoris")}
    </button>
  );
}
