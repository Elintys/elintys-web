import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  fetchCurrentUser,
  deactivateAccount,
  deleteAccount,
  exportUserData,
} from "../../../store/slices/usersSlice";
import { clearCredentials } from "../../../store/slices/authSlice";

const formatDate = (value, locale) => {
  if (!value) return null;
  return new Date(value).toLocaleDateString(locale, { dateStyle: "medium" });
};

export default function useProfilePrivacy(t, language) {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state) => state.users.current);
  const locale = currentUser?.locale || (language === "en" ? "en-CA" : "fr-CA");
  const [message, setMessage] = useState(null);
  const [loadingAction, setLoadingAction] = useState("");
  const [confirmType, setConfirmType] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  useEffect(() => {
    console.log("[profile] GET /users/me");
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleExport = async () => {
    setLoadingAction("export");
    setMessage(null);
    try {
      console.log("[profile] GET /users/me/export");
      const action = await dispatch(exportUserData());
      if (exportUserData.rejected.match(action)) {
        setMessage({
          type: "error",
          text: action.payload?.message || t("Export indisponible pour le moment."),
        });
      } else {
        setMessage({ type: "success", text: t("Export lance.") });
      }
    } finally {
      setLoadingAction("");
    }
  };

  const handleDeactivate = async () => {
    setLoadingAction("deactivate");
    setMessage(null);
    try {
      console.log("[profile] POST /users/me/deactivate");
      const action = await dispatch(deactivateAccount());
      if (deactivateAccount.rejected.match(action)) {
        setMessage({
          type: "error",
          text: action.payload?.message || t("Erreur lors de la desactivation."),
        });
      } else {
        setMessage({ type: "success", text: t("Compte desactive.") });
      }
    } finally {
      setLoadingAction("");
      setConfirmType(null);
    }
  };

  const handleDelete = async () => {
    setLoadingAction("delete");
    setMessage(null);
    try {
      console.log("[profile] DELETE /users/me");
      const action = await dispatch(deleteAccount());
      if (deleteAccount.rejected.match(action)) {
        setMessage({
          type: "error",
          text: action.payload?.message || t("Erreur lors de la suppression."),
        });
      } else {
        dispatch(clearCredentials());
        router.push("/");
      }
    } finally {
      setLoadingAction("");
      setConfirmType(null);
      setDeleteConfirm("");
    }
  };

  const termsDate = useMemo(
    () => formatDate(currentUser?.terms_accepted_at, locale),
    [currentUser?.terms_accepted_at, locale]
  );
  const privacyDate = useMemo(
    () => formatDate(currentUser?.privacy_policy_accepted_at, locale),
    [currentUser?.privacy_policy_accepted_at, locale]
  );

  return {
    currentUser,
    termsDate,
    privacyDate,
    message,
    loadingAction,
    confirmType,
    setConfirmType,
    deleteConfirm,
    setDeleteConfirm,
    handleExport,
    handleDeactivate,
    handleDelete,
  };
}
