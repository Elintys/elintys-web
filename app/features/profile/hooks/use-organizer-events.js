import { useEffect, useState } from "react";
import apiClient from "../../../store/apiClient";
import { ROLES, hasRole, getUserId } from "../../../store/roleUtils";

export default function useOrganizerEvents(currentUser) {
  const [organizerEvents, setOrganizerEvents] = useState([]);

  useEffect(() => {
    let isActive = true;
    const userId = getUserId(currentUser);

    if (hasRole(currentUser, ROLES.ORGANIZER) && userId) {
      console.log(`[profile] GET /events/user/${userId}`);
      apiClient
        .get(`/events/user/${userId}`)
        .then((res) => {
          if (isActive) {
            setOrganizerEvents(Array.isArray(res.data) ? res.data : []);
          }
        })
        .catch(() => {
          if (isActive) setOrganizerEvents([]);
        });
      return () => {
        isActive = false;
      };
    }

    setOrganizerEvents([]);
    return () => {
      isActive = false;
    };
  }, [currentUser]);

  return organizerEvents;
}
