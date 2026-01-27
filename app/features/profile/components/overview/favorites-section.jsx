import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import EventCard from "../../../../components/ui/event-card";

const FavoritesSection = ({ favoriteEvents, t }) => {
  const favoritesRef = useRef(null);

  const scrollFavoritesBy = (delta) => {
    if (!favoritesRef.current) return;
    favoritesRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">{t("Favoris")}</h3>
      </div>
      <div className="relative mt-4">
        <button
          type="button"
          onClick={() => scrollFavoritesBy(-400)}
          className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white/90 text-gray-600 shadow-sm hover:bg-white disabled:opacity-40"
          aria-label={t("Defiler vers la gauche")}
          disabled={!favoriteEvents.length}
        >
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <div
          ref={favoritesRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
        >
          {favoriteEvents.map((event) => (
            <div key={event._id} className="min-w-[380px] max-w-[460px] snap-start">
              <EventCard event={event} />
            </div>
          ))}
          {!favoriteEvents.length && (
            <p className="text-sm text-gray-500">{t("Aucun evenement en favori.")}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => scrollFavoritesBy(400)}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white/90 text-gray-600 shadow-sm hover:bg-white disabled:opacity-40"
          aria-label={t("Defiler vers la droite")}
          disabled={!favoriteEvents.length}
        >
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default FavoritesSection;
