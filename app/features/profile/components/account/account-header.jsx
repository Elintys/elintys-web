const AccountHeader = ({ statusValue, statusStyles, lastLogin, t }) => (
  <div className="flex flex-wrap items-start justify-between gap-4">
    <div>
      <h2 className="text-xl font-semibold text-gray-900">{t("Profil")}</h2>
      <p className="text-sm text-gray-500 mt-1">
        {t("Mettez a jour vos informations principales.")}
      </p>
    </div>
    <div className="flex flex-wrap items-center gap-3">
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
  </div>
);

export default AccountHeader;
