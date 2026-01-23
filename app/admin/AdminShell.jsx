"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../store/slices/usersSlice";
import { ROLES, hasRole } from "../store/roleUtils";
import { getStoredAuth } from "../components/lib/auth";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

const adminRoles = [ROLES.ADMIN, ROLES.SUPER_ADMIN];

export default function AdminShell({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useSelector((state) => state.users.current);
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
      // If there is no token, we stop here and send the user to login.
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

      // We only allow admins or super admins to access the admin area.
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
  }, [auth?.token, dispatch, router, storedAuth?.token, storedAuth?.user]);

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-sm text-slate-500">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar pathname={pathname} />
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
