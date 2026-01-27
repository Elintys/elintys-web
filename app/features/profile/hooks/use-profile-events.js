import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../store/slices/eventsSlice";
import { getFavorites } from "../../../lib/favorites";
import { ROLES, hasRole } from "../../../store/roleUtils";
import useOrganizerEvents from "./use-organizer-events";

export default function useProfileEvents() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const events = useSelector((state) => state.events.list);
  const organizerEvents = useOrganizerEvents(currentUser);

  useEffect(() => {
    if (!hasRole(currentUser, ROLES.ORGANIZER)) {
      console.log("[profile] GET /events/public");
      dispatch(fetchEvents());
    }
  }, [dispatch, currentUser]);

  const favoriteEvents = useMemo(() => {
    const favs = getFavorites();
    return events.filter((event) => favs.includes(event._id));
  }, [events]);

  return {
    currentUser,
    organizerEvents,
    favoriteEvents,
  };
}
