"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchEventById } from "../../../store/slices/eventsSlice";
import { fetchCurrentUser } from "../../../store/slices/usersSlice";
import { ROLES, hasRole, getUserId } from "../../../store/roleUtils";
import { getOrganizerId } from "../utils/event-edit-utils";

export default function useEventEdit(t) {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params?.id;
  const currentEvent = useSelector((state) => state.events.current);
  const currentUser = useSelector((state) => state.users.current);

  useEffect(() => {
    if (!eventId) return;
    dispatch(fetchEventById(eventId));
    dispatch(fetchCurrentUser());
  }, [dispatch, eventId]);

  const canEdit = useMemo(() => {
    const organizerId = getOrganizerId(currentEvent);
    return (
      hasRole(currentUser, ROLES.ORGANIZER) &&
      organizerId &&
      organizerId === getUserId(currentUser)
    );
  }, [currentEvent, currentUser]);

  const handleDelete = async () => {
    if (!eventId) return;
    if (!window.confirm(t("Supprimer cet evenement ?"))) return;
    try {
      await dispatch(deleteEvent(eventId));
      router.push("/events");
    } catch (error) {
      console.error("Erreur suppression evenement:", error);
    }
  };

  return { currentEvent, canEdit, handleDelete };
}
