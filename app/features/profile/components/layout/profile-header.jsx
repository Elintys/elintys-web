import Link from "next/link";

const ProfileHeader = ({ currentUser, headerData, t }) => {
  const { roles, initials, statusValue, statusStyles, lastLogin } = headerData;

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="flex items-center gap-4">
        {currentUser?.photo_url ? (
          <img
            src={currentUser.photo_url}
            alt={t("Avatar")}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-lg">
            {initials || "EL"}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentUser?.display_name || t("Utilisateur")}
          </h1>
          <p className="text-sm text-gray-500">
            {currentUser?.email || t("Compte Elyntis")}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                statusStyles[statusValue] || "bg-gray-100 text-gray-600"
              }`}
            >
              {t(statusValue)}
            </span>
            {lastLogin && (
              <span className="text-xs text-gray-500">
                {t("Derniere connexion")}: {lastLogin}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {roles.map((role) => (
              <span
                key={role}
                className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/profile/account"
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
        >
          {t("Modifier le profil")}
        </Link>
        <Link
          href="/profile/access"
          className="px-4 py-2 rounded-full bg-yellow-400 text-gray-900 text-sm hover:bg-yellow-300 transition"
        >
          {t("Roles et acces")}
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
