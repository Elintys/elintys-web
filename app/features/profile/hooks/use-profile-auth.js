import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../../store/slices/usersSlice";
import { getStoredAuth } from "../../../lib/auth";

export default function useProfileAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const stored = getStoredAuth();
    const token = auth?.token || stored?.token;
    if (!token) {
      router.replace("/login");
      return;
    }
    console.log("[profile] GET /users/me");
    dispatch(fetchCurrentUser());
    setIsAuthChecked(true);
  }, [auth?.token, dispatch, router]);

  return { isAuthChecked };
}
