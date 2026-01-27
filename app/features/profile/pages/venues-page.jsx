"use client";

import Link from "next/link";
import RoleGuard from "../../../components/guards/role-guard";
import { ROLES } from "../../../store/roleUtils";
import useProfileVenues from "../hooks/use-profile-venues";
import VenuesList from "../components/venues/venues-list";

export default function ProfileVenuesPage() {
  const { venues } = useProfileVenues();

  return (
    <RoleGuard
      requiredRoles={[ROLES.LANDLORD]}
      title="Acces restreint"
      description="Ce module est reserve aux proprietaires d'espaces."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Mes espaces</h2>
          <Link href="/venues" className="text-sm text-indigo-600 hover:underline">
            Gerer les lieux
          </Link>
        </div>
        <VenuesList venues={venues} />
      </div>
    </RoleGuard>
  );
}
