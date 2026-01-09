"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchUsers } from "../store/slices/usersSlice";
import { getUserRoles } from "../store/roleUtils";

export default function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Utilisateurs</h1>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id || user.email}
              className="bg-white rounded-xl shadow p-4 border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {user.display_name || user.email || "Utilisateur"}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-400">
                Roles: {getUserRoles(user).join(", ") || "Aucun"}
              </p>
            </div>
          ))}
          {!users.length && (
            <p className="text-gray-500">Aucun utilisateur disponible.</p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
