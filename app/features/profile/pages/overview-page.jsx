"use client";

import { useLanguage } from "../../../i18n/language-provider";
import { ROLES, hasRole } from "../../../store/roleUtils";
import useProfileOverview from "../hooks/use-profile-overview";
import OverviewStats from "../components/overview/overview-stats";
import OrganizerSection from "../components/overview/organizer-section";
import ProviderSection from "../components/overview/provider-section";
import LandlordSection from "../components/overview/landlord-section";
import UpcomingEventsCard from "../components/overview/upcoming-events-card";
import NotificationsCard from "../components/overview/notifications-card";
import FavoritesSection from "../components/overview/favorites-section";

export default function ProfileOverviewPage() {
  const { language, t } = useLanguage();
  const {
    currentUser,
    organizerEvents,
    visibleTickets,
    notifications,
    venues,
    favoriteEvents,
    upcomingEvents,
    locale,
  } = useProfileOverview(language);

  return (
    <div className="space-y-8">
      <OverviewStats
        upcomingEvents={upcomingEvents}
        visibleTickets={visibleTickets}
        notifications={notifications}
        t={t}
      />

      {hasRole(currentUser, ROLES.ORGANIZER) && (
        <OrganizerSection organizerEvents={organizerEvents} t={t} />
      )}

      {hasRole(currentUser, ROLES.PROVIDER) && <ProviderSection t={t} />}

      {hasRole(currentUser, ROLES.LANDLORD) && (
        <LandlordSection venues={venues} t={t} />
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <UpcomingEventsCard upcomingEvents={upcomingEvents} locale={locale} t={t} />
        <NotificationsCard notifications={notifications} t={t} />
      </div>

      <FavoritesSection favoriteEvents={favoriteEvents} t={t} />
    </div>
  );
}
