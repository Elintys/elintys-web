"use client";

import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import { useLanguage } from "../../i18n/language-provider";
import useProfileAuth from "./hooks/use-profile-auth";
import { menuItems } from "./utils/profile-menu";
import { buildBreadcrumbLinks } from "./utils/profile-breadcrumbs";
import { buildProfileHeader } from "./utils/profile-header";
import ProfileHeader from "./components/layout/profile-header";
import ProfileBreadcrumbs from "./components/layout/profile-breadcrumbs";

export default function ProfileShell({ children }) {
  const pathname = usePathname();
  const currentUser = useSelector((state) => state.users.current);
  const { t, language } = useLanguage();
  const { isAuthChecked } = useProfileAuth();

  if (!isAuthChecked) {
    return null;
  }

  const headerData = buildProfileHeader(currentUser, language);
  const breadcrumbLinks = buildBreadcrumbLinks(pathname, menuItems);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <ProfileHeader currentUser={currentUser} headerData={headerData} t={t} />
        <ProfileBreadcrumbs items={breadcrumbLinks} t={t} />
        <div>{children}</div>
      </section>
      <Footer />
    </main>
  );
}
