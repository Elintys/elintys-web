"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../../../store/slices/eventsSlice";
import { getUserId } from "../../../store/roleUtils";
import { ensureMeta, formatDateRange, formatDuration } from "../utils/event-detail-utils";

export default function useEventDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params?.id;
  const event = useSelector((state) => state.events.current);
  const currentUser = useSelector((state) => state.users.current);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;
    let mounted = true;
    setLoading(true);
    setError("");
    dispatch(fetchEventById(eventId)).then((action) => {
      if (!mounted) return;
      if (fetchEventById.rejected.match(action)) {
        setError(action.payload?.message || "Evenement introuvable.");
      }
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [dispatch, eventId]);

  const locale = currentUser?.locale || "fr-CA";
  const coverImage =
    event?.coverImageUrl || event?.imageUrl || event?.image || "/images/image.png";
  const locationLabel =
    event?.manualVenue?.city ||
    event?.manualVenue?.name ||
    event?.manualVenue?.country ||
    "En ligne";
  const organizerLabel = event?.organizerName || event?.user?.displayName || "—";
  const categoryLabel =
    event?.category?.name || event?.categoryName || event?.category || event?.categoryId;
  const durationLabel = formatDuration(event?.startDate, event?.endDate);
  const dateLabel = formatDateRange(event?.startDate, event?.endDate, locale);

  const isOrganizer =
    event?.organizerId && getUserId(currentUser) === String(event.organizerId);

  const tickets = event?.tickets || [];

  useEffect(() => {
    if (!event?.title) return;
    const description = event.description || "";
    document.title = `${event.title} | Elintys`;
    ensureMeta({ name: "description", content: description.slice(0, 160) });
    ensureMeta({ property: "og:title", content: event.title });
    ensureMeta({ property: "og:description", content: description.slice(0, 160) });
    ensureMeta({ property: "og:image", content: coverImage });
  }, [event, coverImage]);

  return {
    eventId,
    event,
    loading,
    error,
    coverImage,
    locationLabel,
    organizerLabel,
    categoryLabel,
    durationLabel,
    dateLabel,
    isOrganizer,
    tickets,
  };
}
