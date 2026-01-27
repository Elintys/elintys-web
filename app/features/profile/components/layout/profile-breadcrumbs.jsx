import Link from "next/link";

const ProfileBreadcrumbs = ({ items, t }) => (
  <nav className="mb-6 text-sm text-gray-500" aria-label={t("Fil d'ariane")}>
    <div className="flex flex-wrap items-center gap-2">
      <Link href="/profile" className="hover:text-gray-700 transition">
        {t("Profil")}
      </Link>
      {items.map((item, index) => (
        <span key={item.href} className="flex items-center gap-2">
          <span className="text-gray-300">/</span>
          {index === items.length - 1 ? (
            <span className="text-gray-700 font-semibold">{t(item.label)}</span>
          ) : (
            <Link href={item.href} className="hover:text-gray-700 transition">
              {t(item.label)}
            </Link>
          )}
        </span>
      ))}
    </div>
  </nav>
);

export default ProfileBreadcrumbs;
