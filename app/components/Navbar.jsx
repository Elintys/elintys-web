// components/Navbar.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearStoredAuth, getStoredAuth } from "./lib/auth";

export default function Navbar() {
  const router = useRouter();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(getStoredAuth());
  }, []);

  const handleLogout = () => {
    clearStoredAuth();
    setAuth(null);
    router.push("/login");
  };

  const userLabel =
    auth?.user?.firstName ||
    auth?.user?.email ||
    "Mon compte";

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Elintys
        </Link>
        <ul className="flex gap-6 text-gray-700 font-medium items-center">
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/about">À propos</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          {auth ? (
            <>
              <li className="text-sm text-gray-500">{userLabel}</li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-indigo-600 hover:underline"
                >
                  Se déconnecter
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/login">Se connecter</Link></li>
              <li><Link href="/register">S&apos;inscrire</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
