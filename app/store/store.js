import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import eventsReducer from "./slices/eventsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import venuesReducer from "./slices/venuesSlice";
import ticketsReducer from "./slices/ticketsSlice";
import invitationsReducer from "./slices/invitationsSlice";
import notificationsReducer from "./slices/notificationsSlice";
import usersReducer from "./slices/usersSlice";
import providersReducer from "./slices/providersSlice";
import eventDraftReducer from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    categories: categoriesReducer,
    venues: venuesReducer,
    tickets: ticketsReducer,
    invitations: invitationsReducer,
    notifications: notificationsReducer,
    users: usersReducer,
    providers: providersReducer,
    eventDraft: eventDraftReducer,
  },
});
