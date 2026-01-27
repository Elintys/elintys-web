import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../../store/slices/ticketsSlice";
import { fetchEvents } from "../../../store/slices/eventsSlice";
import { selectCurrentUser } from "../../../store/authSelectors";
import { isTicketVisibleForUser } from "../../../store/ticketUtils";

export default function useProfileTickets() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.list);
  const events = useSelector((state) => state.events.list);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    console.log("[profile] GET /tickets");
    dispatch(fetchTickets());
    console.log("[profile] GET /events/public");
    dispatch(fetchEvents());
  }, [dispatch]);

  const visibleTickets = useMemo(() => {
    const eventById = new Map(
      events.map((event) => [String(event._id || event.id), event])
    );
    return tickets
      .filter((ticket) => isTicketVisibleForUser(ticket, currentUser))
      .map((ticket) => {
        const event = eventById.get(String(ticket.eventId));
        return {
          ...ticket,
          eventTitle: event?.title || ticket.eventTitle || ticket.eventId,
        };
      });
  }, [tickets, currentUser, events]);

  return {
    visibleTickets,
  };
}
