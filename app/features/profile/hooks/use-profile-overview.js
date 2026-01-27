import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../store/slices/eventsSlice";
import { fetchTickets } from "../../../store/slices/ticketsSlice";
import { fetchNotifications } from "../../../store/slices/notificationsSlice";
import { fetchMyVenues } from "../../../store/slices/venuesSlice";
import { getFavorites } from "../../../lib/favorites";
import useOrganizerEvents from "./use-organizer-events";
import { ROLES, hasRole } from "../../../store/roleUtils";
import { isTicketVisibleForUser } from "../../../store/ticketUtils";

export default function useProfileOverview(language) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const events = useSelector((state) => state.events.list);
  const tickets = useSelector((state) => state.tickets.list);
  const notifications = useSelector((state) => state.notifications.list);
  const venues = useSelector((state) => state.venues.list);
  const organizerEvents = useOrganizerEvents(currentUser);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const locale = language === "en" ? "en-US" : "fr-FR";

  useEffect(() => {
    console.log("[profile] GET /events/public");
    dispatch(fetchEvents());
    console.log("[profile] GET /tickets");
    dispatch(fetchTickets());
    console.log("[profile] GET /notifications");
    dispatch(fetchNotifications());
    if (hasRole(currentUser, ROLES.LANDLORD)) {
      console.log("[profile] GET /venues/me");
      dispatch(fetchMyVenues());
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    setFavoriteIds(getFavorites());
  }, []);

  const visibleTickets = useMemo(() => {
    return tickets.filter((ticket) => isTicketVisibleForUser(ticket, currentUser));
  }, [tickets, currentUser]);

  const favoriteEvents = useMemo(() => {
    return events.filter((event) => favoriteIds.includes(event._id));
  }, [events, favoriteIds]);

  const upcomingEvents = useMemo(() => {
    const source =
      hasRole(currentUser, ROLES.ORGANIZER) && organizerEvents.length
        ? organizerEvents
        : events;
    return source
      .filter((event) => event.startDate && new Date(event.startDate) >= new Date())
      .slice(0, 3);
  }, [events, organizerEvents, currentUser]);

  return {
    currentUser,
    organizerEvents,
    visibleTickets,
    notifications,
    venues,
    favoriteEvents,
    upcomingEvents,
    locale,
  };
}
