"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import RoleGuard from "../../../components/guards/role-guard";
import { fetchCurrentUser } from "../../../store/slices/usersSlice";
import { ROLES } from "../../../store/roleUtils";

const getKey = (eventId) => `elyntisCollaborators_${eventId}`;

function loadCollaborators(eventId) {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(getKey(eventId));
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCollaborators(eventId, collaborators) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getKey(eventId), JSON.stringify(collaborators));
}

export default function CollaboratorsPage() {
  const params = useParams();
  const eventId = params?.id;
  const dispatch = useDispatch();
  const [collaborators, setCollaborators] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!eventId) return;
    setCollaborators(loadCollaborators(eventId));
  }, [eventId]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!eventId) return;
    if (!name) return;
    const next = [...collaborators, { id: Date.now().toString(), name, role }];
    setCollaborators(next);
    saveCollaborators(eventId, next);
    setName("");
    setRole("");
  };

  const handleRemove = (collabId) => {
    if (!eventId) return;
    const next = collaborators.filter((item) => item.id !== collabId);
    setCollaborators(next);
    saveCollaborators(eventId, next);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <RoleGuard
          requiredRoles={[ROLES.ORGANIZER]}
          title="Acces reserve aux organisateurs"
          description="Seuls les organisateurs peuvent gerer les collaborateurs."
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Collaborateurs</h1>
          <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
            <div className="space-y-3">
              {collaborators.map((collab) => (
                <div
                  key={collab.id}
                  className="bg-white rounded-xl shadow p-4 border border-gray-100 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{collab.name}</p>
                    <p className="text-xs text-gray-500">{collab.role || "Collaborateur"}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(collab.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Retirer
                  </button>
                </div>
              ))}
              {!collaborators.length && (
                <p className="text-gray-500">Aucun collaborateur ajoute.</p>
              )}
            </div>
            <form
              onSubmit={handleAdd}
              className="bg-white rounded-xl shadow p-6 space-y-3 h-fit"
            >
              <h2 className="text-lg font-semibold text-gray-800">Ajouter un collaborateur</h2>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                required
              />
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role (staff, co-organisateur)"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Ajouter
              </button>
            </form>
          </div>
        </RoleGuard>
      </section>
      <Footer />
    </main>
  );
}
