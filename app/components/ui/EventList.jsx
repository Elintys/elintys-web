// components/ui/EventList.jsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "./EventCard";
import { fetchEvents } from "../../store/slices/eventsSlice";

export default function EventList() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.list);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
