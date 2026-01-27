import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const getKey = (venueId) => `elyntisVenueAvailability_${venueId}`;

const loadAvailability = (venueId) => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(getKey(venueId));
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveAvailability = (venueId, dates) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(getKey(venueId), JSON.stringify(dates));
};

export default function useVenueAvailability() {
  const params = useParams();
  const venueId = params?.id;
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!venueId) return;
    setDates(loadAvailability(venueId));
  }, [venueId]);

  const handleAdd = (event) => {
    event.preventDefault();
    if (!venueId || !date) return;
    const next = [...dates, date];
    setDates(next);
    saveAvailability(venueId, next);
    setDate("");
  };

  const handleRemove = (selected) => {
    if (!venueId) return;
    const next = dates.filter((item) => item !== selected);
    setDates(next);
    saveAvailability(venueId, next);
  };

  return {
    dates,
    date,
    setDate,
    handleAdd,
    handleRemove,
  };
}
