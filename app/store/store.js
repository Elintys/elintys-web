import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import eventsReducer from "./slices/eventsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import venuesReducer from "./slices/venuesSlice";
import ticketsReducer from "./slices/ticketsSlice";
import invitationsReducer from "./slices/invitationsSlice";
import notificationsReducer from "./slices/notificationsSlice";
import usersReducer from "./slices/usersSlice";

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
  },
});
