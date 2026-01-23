"use client";

import { useEffect, useState } from "react";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { isFavorite, toggleFavorite } from "../../components/lib/favorites";
import { useLanguage } from "../../i18n/LanguageProvider";

export default function VenueFavoriteButton({ venueId }) {
  const [favorite, setFavorite] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setFavorite(isFavorite(venueId));
  }, [venueId]);

  if (!venueId) {
    return null;
  }

  const handleToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const next = toggleFavorite(venueId);
    setFavorite(next.includes(venueId));
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`relative z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
        favorite
          ? "border-rose-200 bg-rose-50 text-rose-500"
          : "border-slate-200 bg-white text-slate-400 hover:text-rose-400"
      }`}
      aria-label={
        favorite ? t("venues.card.favoriteRemove") : t("venues.card.favoriteAdd")
      }
    >
      {favorite ? (
        <HeartSolidIcon className="h-4 w-4" />
      ) : (
        <HeartOutlineIcon className="h-4 w-4" />
      )}
    </button>
  );
}
