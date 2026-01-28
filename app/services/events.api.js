// Thin wrapper around the BFF to fetch event-related data such as similar events.
import apiClient from "../store/apiClient";

export async function getSimilarEvents(eventId, { limit = 6 } = {}) {
  const response = await apiClient.get(`/events/${eventId}/similar`, {
    params: { limit },
  });
  return response.data;
}
