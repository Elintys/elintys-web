import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../../store/slices/usersSlice";
import { getUserRoles } from "../../../store/roleUtils";
import { roleConfig } from "../utils/profile-roles";

export default function useProfileAccess() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);

  useEffect(() => {
    console.log("[profile] GET /users/me");
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const roles = useMemo(() => getUserRoles(currentUser), [currentUser]);
  const roleEntries = useMemo(() => Object.entries(roleConfig), []);

  return {
    currentUser,
    roles,
    roleEntries,
  };
}
