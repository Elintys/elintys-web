// lib/api.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// Simulation de données si API indisponible
const mockEvents = [
  {
    _id: "1",
    title: "Gala des Entrepreneurs 2025",
    description:
      "Une soirée exceptionnelle dédiée à la célébration de l'innovation et de l'entrepreneuriat.",
    category: "Business",
    startDate: "2025-12-20T19:00:00Z",
    image: "/images/event1.jpg",
  },
  {
    _id: "2",
    title: "Festival Afro Vibes Montréal",
    description:
      "Musique, art et culture africaine réunis pour un weekend inoubliable.",
    category: "Culture",
    startDate: "2025-11-05T18:00:00Z",
    image: "/images/event2.jpg",
  },
];

export async function getAllEvents() {
  try {
    const res = await axios.get(`${BASE_URL}/events`);
    return res.data;
  } catch {
    return mockEvents;
  }
}

export async function getEventById(id) {
  try {
    const res = await axios.get(`${BASE_URL}/events/${id}`);
    return res.data;
  } catch {
    return mockEvents.find((e) => e._id === id);
  }
}
