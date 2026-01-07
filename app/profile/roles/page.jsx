"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserRole, fetchCurrentUser } from "../../store/slices/usersSlice";
import { ROLES, hasRole, getUserId } from "../../store/roleUtils";
import { getStoredAuth } from "../../components/lib/auth";

const roleCards = [
  {
    role: ROLES.USER,
    title: "Utilisateur",
    description: "Acces aux evenements, billets et notifications.",
  },
  {
    role: ROLES.ORGANIZER,
    title: "Organisateur",
    description: "Creer, gerer et suivre vos evenements.",
  },
  {
    role: ROLES.PROVIDER,
    title: "Prestataire",
    description: "Proposer vos services et recevoir des demandes.",
  },
  {
    role: ROLES.LANDLORD,
    title: "Proprietaire",
    description: "Lister vos espaces et gerer les reservations.",
  },
];

export default function ProfileRolesPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleActivate = async (role) => {
    setMessage("");
    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour activer ce role.");
      return;
    }
    if (!getUserId(currentUser)) {
      setMessage("Utilisateur introuvable. Veuillez vous reconnecter.");
      return;
    }
    try {
      await dispatch(addUserRole({ userId: getUserId(currentUser), roleCode: role }));
      await dispatch(fetchCurrentUser());
      setMessage(`Role ${role} active.`);
    } catch (error) {
      console.error("Erreur activation role:", error);
      setMessage("Erreur lors de l'activation du role.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Gerer mes roles</h2>
        <p className="text-sm text-gray-500 mt-2">
          Activez des roles pour debloquer de nouvelles fonctionnalites.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {roleCards.map((card) => (
          <div
            key={card.role}
            className="bg-white rounded-2xl shadow border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{card.description}</p>
            {hasRole(currentUser, card.role) ? (
              <span className="mt-4 inline-flex items-center text-sm text-green-600">
                Role actif
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleActivate(card.role)}
                className="mt-4 inline-flex items-center px-5 py-2 rounded-full bg-yellow-400 text-gray-900 text-sm font-semibold hover:bg-yellow-300 transition"
              >
                Activer ce role
              </button>
            )}
          </div>
        ))}
      </div>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
}
