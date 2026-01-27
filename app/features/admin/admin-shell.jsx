"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./components/admin-sidebar";
import AdminHeader from "./components/admin-header";
import useAdminAuth from "./hooks/use-admin-auth";

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const { isAuthChecked } = useAdminAuth();

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-sm text-slate-500">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar pathname={pathname} />
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
