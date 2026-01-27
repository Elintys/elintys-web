import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchCurrentUser } from "../../../store/slices/usersSlice";
import { clearCredentials } from "../../../store/slices/authSlice";

export default function useProfileSecurity(language) {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state) => state.users.current);

  useEffect(() => {
    console.log("[profile] GET /users/me");
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const lastLogin = useMemo(() => {
    const locale = currentUser?.locale || (language === "en" ? "en-CA" : "fr-CA");
    return currentUser?.last_login_at
      ? new Date(currentUser.last_login_at).toLocaleString(locale)
      : null;
  }, [currentUser, language]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    router.push("/");
  };

  const handleReLogin = () => {
    router.push("/login");
  };

  return {
    currentUser,
    lastLogin,
    handleLogout,
    handleReLogin,
  };
}
