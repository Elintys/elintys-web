import adminApiClient from "./adminApiClient";
import apiClient from "./apiClient";

// Centralized admin API access, wired to BFF routes.
export const adminApi = {
  fetchOverview: () => adminApiClient.get("/dashboard/overview"),
  fetchUsers: (params) => adminApiClient.get("/users", { params }),
  updateUserStatus: (id, status) =>
    adminApiClient.patch(`/users/${id}/status`, { status }),
  assignRole: (id, roleCode) => apiClient.post(`/users/${id}/roles`, { roleCode }),
  fetchEvents: (params) => adminApiClient.get("/events", { params }),
  approveEvent: (id) => adminApiClient.patch(`/events/${id}/approve`),
  rejectEvent: (id) => adminApiClient.patch(`/events/${id}/reject`),
  unpublishEvent: (id) => adminApiClient.patch(`/events/${id}/unpublish`),
  fetchProviders: (params) => adminApiClient.get("/providers", { params }),
  verifyProvider: (id, isVerified) =>
    adminApiClient.patch(`/providers/${id}/verify`, { isVerified }),
  suspendService: (id) => adminApiClient.patch(`/services/${id}/suspend`),
  fetchVenues: (params) => apiClient.get("/bff/venues", { params }),
};
