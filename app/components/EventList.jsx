// components/EventList.jsx
"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { getAllEvents } from "./lib/api";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const data = await getAllEvents();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
