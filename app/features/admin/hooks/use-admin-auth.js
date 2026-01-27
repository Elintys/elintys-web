import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../../store/slices/usersSlice";
import { ROLES, hasRole } from "../../../store/roleUtils";
import { getStoredAuth } from "../../../lib/auth";

const adminRoles = [ROLES.ADMIN, ROLES.SUPER_ADMIN];

export default function useAdminAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const storedAuth = useMemo(
    () => (typeof window !== "undefined" ? getStoredAuth() : null),
    []
  );

  useEffect(() => {
    let isMounted = true;

    const checkAccess = async () => {
      const token = auth?.token || storedAuth?.token;
      if (!token) {
        router.replace("/login");
        return;
      }

      const action = await dispatch(fetchCurrentUser());
      if (action.type.endsWith("rejected")) {
        router.replace("/login");
        return;
      }

      const fallbackUser = action.payload || auth?.user || storedAuth?.user;
      if (!fallbackUser) {
        router.replace("/login");
        return;
      }

      const isAdmin = adminRoles.some((role) => hasRole(fallbackUser, role));
      if (!isAdmin) {
        router.replace("/login");
        return;
      }

      if (isMounted) {
        setIsAuthChecked(true);
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [auth?.token, auth?.user, dispatch, router, storedAuth?.token, storedAuth?.user]);

  return { isAuthChecked };
}
