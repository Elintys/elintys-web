"use client";

import RoleGuard from "../../../components/guards/role-guard";
import { ROLES, hasRole } from "../../../store/roleUtils";
import { useLanguage } from "../../../i18n/language-provider";
import useProfileEvents from "../hooks/use-profile-events";
import EventsHeader from "../components/events/events-header";
import EventsSection from "../components/events/events-section";

export default function ProfileEventsPage() {
  const { t } = useLanguage();
  const { currentUser, organizerEvents, favoriteEvents } = useProfileEvents();

  return (
    <RoleGuard
      requiredRoles={[ROLES.USER, ROLES.ORGANIZER]}
      title="Acces restreint"
      description="Vous devez etre connecte pour acceder a vos evenements."
    >
      <div className="space-y-8">
        <EventsHeader currentUser={currentUser} t={t} />

        {hasRole(currentUser, ROLES.ORGANIZER) ? (
          <EventsSection
            title="Evenements crees"
            events={organizerEvents}
            emptyMessage="Aucun evenement cree pour le moment."
            t={t}
          />
        ) : (
          <EventsSection
            title="Evenements favoris"
            events={favoriteEvents}
            emptyMessage="Aucun favori pour le moment."
            t={t}
          />
        )}
      </div>
    </RoleGuard>
  );
}
