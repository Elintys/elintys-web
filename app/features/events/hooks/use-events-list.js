"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getStoredAuth } from "../../../lib/auth";
import { getFavorites, savePreferences } from "../../../lib/favorites";
import { fetchEvents } from "../../../store/slices/eventsSlice";
import { fetchCategories } from "../../../store/slices/categoriesSlice";
import { ROLES, hasRole } from "../../../store/roleUtils";

export default function useEventsList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const events = useSelector((state) => state.events.list);
  const categories = useSelector((state) => state.categories.list);
  const currentUser = useSelector((state) => state.users.current);
  const auth = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchCategories());
    setFavorites(getFavorites());
  }, [dispatch]);

  const storedAuth = typeof window !== "undefined" ? getStoredAuth() : null;
  const isAuthenticated = Boolean(auth?.token || storedAuth?.token);

  const isOrganizer = hasRole(currentUser, ROLES.ORGANIZER);

  const handleBecomeOrganizer = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    router.push("/profile/access");
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (showFavorites && !favorites.includes(event._id)) return false;
      if (query && !event.title?.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      if (categoryId && event.categoryId !== categoryId) return false;
      if (startDate && new Date(event.startDate) < new Date(startDate)) return false;
      if (endDate && new Date(event.startDate) > new Date(endDate)) return false;
      return true;
    });
  }, [events, favorites, showFavorites, query, categoryId, startDate, endDate]);

  const handleSavePreferences = () => {
    savePreferences({ query, categoryId, startDate, endDate });
  };

  return {
    events,
    categories,
    currentUser,
    query,
    setQuery,
    categoryId,
    setCategoryId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showFavorites,
    setShowFavorites,
    filteredEvents,
    handleSavePreferences,
    handleBecomeOrganizer,
    handleLoginRedirect,
    showLoginModal,
    setShowLoginModal,
    isOrganizer,
  };
}
