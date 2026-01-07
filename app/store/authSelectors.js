import { getUserRoles } from "./roleUtils";

export const selectAuthUser = (state) => state.auth.user;
export const selectCurrentUser = (state) => state.users.current;
export const selectUserRoles = (state) => getUserRoles(selectCurrentUser(state));
