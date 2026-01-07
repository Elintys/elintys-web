"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../store/slices/ticketsSlice";
import RoleGuard from "../../components/RoleGuard";
import { ROLES } from "../../store/roleUtils";
import { selectCurrentUser } from "../../store/authSelectors";
import { isTicketVisibleForUser } from "../../store/ticketUtils";

export default function ProfileTicketsPage() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.list);
  const currentUser = useSelector(selectCurrentUser);

  const visibleTickets = useMemo(() => {
    return tickets.filter((ticket) => isTicketVisibleForUser(ticket, currentUser));
  }, [tickets, currentUser]);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <RoleGuard
      requiredRoles={[ROLES.USER]}
      title="Acces restreint"
      description="Vous devez etre connecte pour acceder a vos billets."
    >
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Mes billets</h2>
        <div className="grid gap-4">
          {visibleTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-2xl shadow border border-gray-100 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {ticket.eventTitle || "Billet Elyntis"}
                </h3>
                <p className="text-sm text-gray-500">
                  Statut: {ticket.status || "Actif"}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  QR Code
                </div>
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Telecharger
                </button>
              </div>
            </div>
          ))}
          {!visibleTickets.length && (
            <p className="text-sm text-gray-500">Aucun billet disponible.</p>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
