"use client";

import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import RoleGuard from "../../../components/guards/role-guard";
import { ROLES } from "../../../store/roleUtils";
import { useLanguage } from "../../../i18n/language-provider";
import useEventEdit from "../hooks/use-event-edit";
import CreateEventWizard from "../components/create-event/create-event-wizard";

export default function EventEditPage() {
  const { t } = useLanguage();
  const { currentEvent, canEdit, handleDelete } = useEventEdit(t);

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
