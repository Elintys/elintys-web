import { getUserId } from "./roleUtils";

const normalizeId = (value) => {
  if (!value) return null;
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object") {
    return (
      value._id ||
      value.id ||
      value.firebaseUid ||
      null
    );
  }
  return null;
};

export const getTicketAssignedId = (ticket) =>
  normalizeId(
    ticket?.userId ||
      ticket?.user ||
      ticket?.attendee ||
      ticket?.assignedUser ||
      ticket?.assignedTo ||
      null
  );

export const getTicketCreatorId = (ticket) =>
  normalizeId(
    ticket?.createdBy ||
      ticket?.creator ||
      ticket?.creatorId ||
      ticket?.issuedBy ||
      ticket?.issuedById ||
      null
  );

export const isTicketVisibleForUser = (ticket, user) => {
  const userId = normalizeId(getUserId(user));
  if (!userId) return false;
  const assignedId = normalizeId(getTicketAssignedId(ticket));
  const creatorId = normalizeId(getTicketCreatorId(ticket));
  return [assignedId, creatorId].some((id) => id && String(id) === String(userId));
};
