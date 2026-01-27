import { ROLES } from "../../../store/roleUtils";

export const menuItems = [
  { href: "/profile/overview", label: "Apercu" },
  {
    href: "/profile/events",
    label: "Evenements",
    roles: [ROLES.USER, ROLES.ORGANIZER],
  },
  { href: "/profile/tickets", label: "Billets", roles: [ROLES.USER] },
  { href: "/profile/services", label: "Services", roles: [ROLES.PROVIDER] },
  { href: "/profile/venues", label: "Espaces", roles: [ROLES.LANDLORD] },
  { href: "/profile/notifications", label: "Notifications" },
  { href: "/profile/account", label: "Profil" },
  { href: "/profile/security", label: "Securite" },
  { href: "/profile/preferences", label: "Preferences" },
  { href: "/profile/privacy", label: "Confidentialite" },
  { href: "/profile/access", label: "Roles et acces" },
];
