"use client";

import RoleGuard from "../../../components/guards/role-guard";
import { ROLES } from "../../../store/roleUtils";
import { useLanguage } from "../../../i18n/language-provider";
import useProfileTickets from "../hooks/use-profile-tickets";
import TicketsList from "../components/tickets/tickets-list";

export default function ProfileTicketsPage() {
  const { t } = useLanguage();
  const { visibleTickets } = useProfileTickets();

  return (
    <RoleGuard
      requiredRoles={[ROLES.USER]}
      title="Acces restreint"
      description="Vous devez etre connecte pour acceder a vos billets."
    >
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">{t("Mes billets")}</h2>
        <TicketsList tickets={visibleTickets} t={t} />
      </div>
    </RoleGuard>
  );
}
