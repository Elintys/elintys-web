"use client";

import Link from "next/link";
import RoleGuard from "../../../components/guards/role-guard";
import { ROLES } from "../../../store/roleUtils";

export default function ProfileServicesPage() {
  return (
    <RoleGuard
      requiredRoles={[ROLES.PROVIDER]}
      title="Acces restreint"
      description="Ce module est reserve aux prestataires."
    >
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Mes services</h2>
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
          <p className="text-sm text-gray-500">
            Gerer vos services, vos demandes et vos prestations a venir.
          </p>
          <Link
            href="/services/manage"
            className="mt-4 inline-flex items-center px-5 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Gerer mes services
          </Link>
        </div>
      </div>
    </RoleGuard>
  );
}
