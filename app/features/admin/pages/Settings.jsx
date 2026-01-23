"use client";

import AdminCard from "../components/AdminCard";
import { useLanguage } from "../../../i18n/LanguageProvider";

export default function AdminSettingsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Parametres")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Parametrage global de la plateforme.")}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard title={t("Categories d'evenements")} subtitle={t("Gestion du catalogue")}>
          <p className="text-sm text-slate-600">
            {t("Ajouter, renommer ou archiver des categories d'evenements.")}
          </p>
        </AdminCard>
        <AdminCard title={t("Regles de publication")} subtitle={t("Workflow contenu")}>
          <p className="text-sm text-slate-600">
            {t("Definir les criteres de mise en ligne et de moderation.")}
          </p>
        </AdminCard>
        <AdminCard title={t("Validation automatique")} subtitle={t("Automatisations")}>
          <p className="text-sm text-slate-600">
            {t("Configurer les seuils d'approbation automatique.")}
          </p>
        </AdminCard>
        <AdminCard title={t("Gestion des roles admin")} subtitle={t("Permissions internes")}>
          <p className="text-sm text-slate-600">
            {t("Attribuer ou retirer les droits ADMIN / SUPER_ADMIN.")}
          </p>
        </AdminCard>
        <AdminCard title={t("Feature flags")} subtitle={t("Activation / desactivation")}>
          <p className="text-sm text-slate-600">
            {t("Basculer les modules en beta pour la plateforme.")}
          </p>
        </AdminCard>
      </div>
    </div>
  );
}
