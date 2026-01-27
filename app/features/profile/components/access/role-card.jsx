const RoleCard = ({ roleKey, role, isActive, t }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">{t(role.title)}</h3>
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full ${
          isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
        }`}
      >
        {isActive ? t("Actif") : t("Inactif")}
      </span>
    </div>
    <p className="text-sm text-gray-500 mt-2">{t(role.description)}</p>
    <ul className="mt-4 space-y-1 text-sm text-gray-600">
      {role.capabilities.map((capability) => (
        <li key={`${roleKey}-${capability}`}>• {t(capability)}</li>
      ))}
    </ul>
  </div>
);

export default RoleCard;
