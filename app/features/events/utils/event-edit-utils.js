export const getOrganizerId = (event) =>
  event?.organizer?._id ||
  event?.organizerId ||
  event?.organizer ||
  event?.createdBy ||
  null;
