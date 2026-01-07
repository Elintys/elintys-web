"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchCurrentUser } from "../store/slices/usersSlice";
import { ROLES, hasRole } from "../store/roleUtils";

const sections = [
  {
    title: "Invites",
    modules: [
      { href: "/events", title: "Evenements publics", description: "Rechercher et filtrer." },
      { href: "/favorites", title: "Favoris", description: "Retrouver les evenements enregistres." },
      { href: "/recommendations", title: "Recommandations", description: "Suggestions personnalisees." },
      { href: "/my-tickets", title: "Mes billets", description: "Billets numeriques." },
    ],
  },
  {
    title: "Organisateurs",
    modules: [
      { href: "/events", title: "Gestion evenements", description: "Creer, modifier, supprimer." },
      { href: "/events/new", title: "Nouveau evenement", description: "Demarrer une organisation." },
      { href: "/venues", title: "Lieux", description: "Rechercher et reserver." },
      { href: "/providers", title: "Prestataires", description: "Demander des devis." },
      { href: "/invitations", title: "Invitations", description: "Invites et statut." },
      { href: "/tickets/types", title: "Types de billets", description: "Segmenter l'acces." },
      { href: "/notifications/reminders", title: "Rappels", description: "Relancer les invites." },
      { href: "/analytics", title: "Statistiques", description: "Suivi et analyses." },
      { href: "/payments/revenue", title: "Revenus", description: "Suivre les ventes." },
    ],
  },
  {
    title: "Staff",
    modules: [
      { href: "/checkin", title: "Check-in", description: "Scanner les billets." },
      { href: "/checkin/attendance", title: "Presences", description: "Suivi en temps reel." },
    ],
  },
  {
    title: "Administration",
    modules: [
      { href: "/users", title: "Utilisateurs", description: "Consulter les profils." },
      { href: "/admin/reports", title: "Signalements", description: "Gestion securite." },
      { href: "/admin/performance", title: "Performance", description: "Surveillance plateforme." },
      { href: "/admin/rules", title: "Regles", description: "Moderation et contenus." },
    ],
  },
  {
    title: "IA",
    modules: [
      { href: "/ai", title: "IA & automatisation", description: "Predictions et chatbot." },
      { href: "/analytics/insights", title: "Analyses IA", description: "Optimiser les events." },
    ],
  },
];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const visibleSections = sections.filter((section) => {
    if (section.title === "Organisateurs") {
      return hasRole(currentUser, ROLES.ORGANIZER);
    }
    if (section.title === "Staff") {
      return hasRole(currentUser, ROLES.STAFF) || hasRole(currentUser, ROLES.ADMIN);
    }
    if (section.title === "Administration") {
      return hasRole(currentUser, ROLES.ADMIN);
    }
    return true;
  });

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Acces rapide aux modules Elyntis.</p>
        </div>
        {!hasRole(currentUser, ROLES.ORGANIZER) && (
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Devenir organisateur</h2>
            <p className="text-sm text-gray-500 mt-2">
              Activez votre role pour creer et gerer vos evenements.
            </p>
            <Link
              href="/profile"
              className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition"
            >
              Demander le role
            </Link>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-6">
          {hasRole(currentUser, ROLES.ORGANIZER) && (
            <>
              <Link
                href="/profile"
                className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md transition p-6"
              >
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  Mes evenements
                </h3>
                <p className="text-gray-600 text-sm">Acceder a vos evenements.</p>
              </Link>
              <Link
                href="/events/new"
                className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md transition p-6"
              >
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  Creer un evenement
                </h3>
                <p className="text-gray-600 text-sm">Publier un nouvel evenement.</p>
              </Link>
            </>
          )}
          {hasRole(currentUser, ROLES.PROVIDER) && (
            <Link
              href="/services/manage"
              className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md transition p-6"
            >
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Mes services
              </h3>
              <p className="text-gray-600 text-sm">Gerer vos prestations.</p>
            </Link>
          )}
          {hasRole(currentUser, ROLES.LANDLORD) && (
            <Link
              href="/venues"
              className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md transition p-6"
            >
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Mes espaces
              </h3>
              <p className="text-gray-600 text-sm">Gerer vos lieux et disponibilites.</p>
            </Link>
          )}
        </div>
        {visibleSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{section.title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {section.modules.map((mod) => (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                    {mod.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{mod.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </main>
  );
}
