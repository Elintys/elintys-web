// Carousel component that fetches similar events for an event detail view via Redux.
"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilarEvents, selectSimilarEvents } from "../../store/slices/similarEventsSlice";
import SimilarEventCard from "./SimilarEventCard";

const SKELETON_COUNT = 3;

export default function SimilarEventsCarousel({ eventId }) {
  const dispatch = useDispatch();
  const { status, items, error } = useSelector((state) =>
    selectSimilarEvents(state, eventId),
  );

  useEffect(() => {
    if (!eventId || status !== "idle") {
      return;
    }
    dispatch(fetchSimilarEvents(eventId));
  }, [dispatch, eventId, status]);

  const handleRetry = useCallback(() => {
    if (eventId) {
      dispatch(fetchSimilarEvents(eventId));
    }
  }, [dispatch, eventId]);

  const renderSkeletons = useMemo(
    () =>
      Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <div
          key={index}
          className="shrink-0 w-60 h-56 rounded-2xl border border-gray-100 bg-gray-100 animate-pulse"
        />
      )),
    [],
  );

  const showSkeletons = status === "idle" || status === "loading";
  const showError = status === "failed";
  const showEmpty = status === "succeeded" && items.length === 0;
  const showItems = status === "succeeded" && items.length > 0;

  return (
    <section className="space-y-3" aria-live="polite">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Événements similaires</h2>
      </div>

      {showSkeletons && (
        <div className="flex gap-4 overflow-x-auto py-2" aria-label="Chargement des événements similaires">
          {renderSkeletons}
        </div>
      )}

      {showError && (
        <div className="flex items-center justify-between rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>Impossible de charger les événements similaires.</span>
          <button
            type="button"
            onClick={handleRetry}
            className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Réessayer
          </button>
        </div>
      )}

      {showEmpty && (
        <p className="text-sm text-gray-500">Aucun événement similaire pour le moment.</p>
      )}

      {showItems && (
        <div
          role="region"
          aria-label="Événements similaires"
          tabIndex={0}
          className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <div className="flex gap-4 py-2">
            {items.map((event) => (
              <SimilarEventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
