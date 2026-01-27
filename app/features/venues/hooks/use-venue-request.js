import { useState } from "react";
import { useParams } from "next/navigation";

const STORAGE_KEY = "elyntisVenueRequests";

const loadRequests = () => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveRequests = (requests) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
};

export default function useVenueRequest() {
  const params = useParams();
  const venueId = params?.id;
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!venueId) return;
    const next = [...loadRequests(), { id: Date.now().toString(), venueId, eventName, date }];
    saveRequests(next);
    setSent(true);
  };

  return {
    eventName,
    setEventName,
    date,
    setDate,
    sent,
    handleSubmit,
  };
}
