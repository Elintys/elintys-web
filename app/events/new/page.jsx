"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLanguage } from "../../i18n/LanguageProvider";
import RoleGuard from "../../components/RoleGuard";
import { ROLES } from "../../store/roleUtils";
import CreateEventWizard from "./CreateEventWizard";

export default function EventCreatePage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
      <RoleGuard
          requiredRoles={[ROLES.ORGANIZER]}
          title="Acces restreint"
          description="Seuls les organisateurs peuvent creer un evenement."
        >
          <div>
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
              <p className="text-sm text-gray-500 mb-2">{t("Creation")}</p>
              <h1 className="text-3xl font-bold text-gray-900">
                {t("Creer un evenement")}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                {t("Creation rapide en mode brouillon, avec lieu et prestataires manuels.")}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
              <CreateEventWizard />
            </div>
          </div>
        </RoleGuard>
      </section>
      <Footer />
    </main>
  );
}
