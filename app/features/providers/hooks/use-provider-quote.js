import { useState } from "react";
import { useParams } from "next/navigation";

const STORAGE_KEY = "elyntisProviderQuotes";

const loadQuotes = () => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveQuotes = (quotes) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
};

export default function useProviderQuote() {
  const params = useParams();
  const providerId = params?.id;
  const [eventName, setEventName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!providerId) return;
    const next = [
      ...loadQuotes(),
      { id: Date.now().toString(), providerId, eventName, message },
    ];
    saveQuotes(next);
    setSent(true);
  };

  return {
    eventName,
    setEventName,
    message,
    setMessage,
    sent,
    handleSubmit,
  };
}
