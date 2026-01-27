import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUserProfile } from "../../../store/slices/usersSlice";

const MAX_BIO_LENGTH = 250;

const isValidUrl = (value) => {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export default function useProfileAccount(t, language) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const [form, setForm] = useState({
    display_name: "",
    bio: "",
    photo_url: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("[profile] GET /users/me");
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser) return;
    setForm({
      display_name: currentUser.display_name || "",
      bio: currentUser.bio || "",
      photo_url: currentUser.photo_url || "",
    });
  }, [currentUser]);

  const photoPreview = useMemo(() => {
    if (!form.photo_url || !isValidUrl(form.photo_url)) return null;
    return form.photo_url;
  }, [form.photo_url]);

  const statusValue = currentUser?.deleted_at
    ? "DELETED"
    : currentUser?.status || "PENDING";
  const statusStyles = {
    ACTIVE: "bg-green-100 text-green-700",
    PENDING: "bg-gray-100 text-gray-600",
    SUSPENDED: "bg-red-100 text-red-700",
    DELETED: "bg-zinc-200 text-zinc-600",
  };
  const locale = currentUser?.locale || (language === "en" ? "en-CA" : "fr-CA");
  const lastLogin = currentUser?.last_login_at
    ? new Date(currentUser.last_login_at).toLocaleString(locale)
    : null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    const trimmedName = form.display_name.trim();
    if (trimmedName.length < 2) {
      setMessage({ type: "error", text: t("Le nom doit contenir au moins 2 caracteres.") });
      return;
    }
    if (form.bio.length > MAX_BIO_LENGTH) {
      setMessage({ type: "error", text: t("La bio ne peut pas depasser 250 caracteres.") });
      return;
    }
    if (!isValidUrl(form.photo_url)) {
      setMessage({ type: "error", text: t("L'URL de la photo n'est pas valide.") });
      return;
    }

    setLoading(true);
    try {
      console.log("[profile] PATCH /users/me/profile");
      const action = await dispatch(
        updateUserProfile({
          display_name: trimmedName,
          bio: form.bio,
          photo_url: form.photo_url || null,
        })
      );
      if (updateUserProfile.rejected.match(action)) {
        setMessage({
          type: "error",
          text: action.payload?.message || t("Erreur lors de la mise a jour."),
        });
      } else {
        setMessage({ type: "success", text: t("Profil mis a jour.") });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    form,
    setForm,
    message,
    loading,
    photoPreview,
    statusValue,
    statusStyles,
    lastLogin,
    handleChange,
    handleSubmit,
    maxBioLength: MAX_BIO_LENGTH,
  };
}
