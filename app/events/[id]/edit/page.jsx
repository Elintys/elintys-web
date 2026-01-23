"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { deleteEvent, fetchEventById } from "../../../store/slices/eventsSlice";
import { fetchCurrentUser } from "../../../store/slices/usersSlice";
import RoleGuard from "../../../components/guards/RoleGuard";
import { ROLES, hasRole, getUserId } from "../../../store/roleUtils";
import CreateEventWizard from "../../new/CreateEventWizard";
import { useLanguage } from "../../../i18n/LanguageProvider";

const getOrganizerId = (event) =>
  event?.organizer?._id ||
  event?.organizerId ||
  event?.organizer ||
  event?.createdBy ||
  null;

export default function EventEditPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params?.id;
  const currentEvent = useSelector((state) => state.events.current);
  const currentUser = useSelector((state) => state.users.current);
  const { t } = useLanguage();

  useEffect(() => {
    if (!eventId) return;
    dispatch(fetchEventById(eventId));
    dispatch(fetchCurrentUser());
  }, [dispatch, eventId]);

  const canEdit = useMemo(() => {
    const organizerId = getOrganizerId(currentEvent);
    return (
      hasRole(currentUser, ROLES.ORGANIZER) &&
      organizerId &&
      organizerId === getUserId(currentUser)
    );
  }, [currentEvent, currentUser]);

  const handleDelete = async () => {
    if (!eventId) return;
    if (!window.confirm(t("Supprimer cet evenement ?"))) return;
    try {
      await dispatch(deleteEvent(eventId));
      router.push("/events");
    } catch (error) {
      console.error("Erreur suppression evenement:", error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
          <p className="text-sm text-gray-500 mb-2">{t("Mise a jour")}</p>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("Modifier l'evenement")}
          </h1>
        </div>
        <RoleGuard
          requiredRoles={[ROLES.ORGANIZER]}
          title="Acces restreint"
          description="Seuls les organisateurs peuvent modifier un evenement."
        >
          {canEdit ? (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-5 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                >
                  {t("Supprimer")}
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                <CreateEventWizard initialDraft={currentEvent} mode="edit" />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 max-w-2xl">
              <h2 className="text-lg font-semibold text-gray-900">
                {t("Acces restreint")}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {t(
                  "Seul l'organisateur qui a cree cet evenement peut le modifier. Accedez a vos evenements depuis votre profil."
                )}
              </p>
            </div>
          )}
        </RoleGuard>
      </section>
      <Footer />
    </main>
  );
}
