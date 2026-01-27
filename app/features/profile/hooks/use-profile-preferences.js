import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUserPreferences } from "../../../store/slices/usersSlice";

export default function useProfilePreferences(t, setLanguage) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const [form, setForm] = useState({
    locale: "fr-CA",
    timezone: "America/Montreal",
    marketing_consent: false,
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
      locale: currentUser.locale || "fr-CA",
      timezone: currentUser.timezone || "America/Montreal",
      marketing_consent: Boolean(currentUser.marketing_consent),
    });
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      console.log("[profile] PATCH /users/me/profile");
      const action = await dispatch(updateUserPreferences(form));
      if (updateUserPreferences.rejected.match(action)) {
        setMessage({
          type: "error",
          text: action.payload?.message || t("Erreur lors de la mise a jour."),
        });
      } else {
        setMessage({ type: "success", text: t("Preferences mises a jour.") });
        const nextLanguage = form.locale.startsWith("en") ? "en" : "fr";
        setLanguage(nextLanguage);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    form,
    message,
    loading,
    handleChange,
    handleSubmit,
  };
}
