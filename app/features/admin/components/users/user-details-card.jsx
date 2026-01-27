import AdminCard from "../admin-card";
import AdminBadge from "../admin-badge";

const UserDetailsCard = ({ user, onClose, t }) => {
  if (!user) return null;

  return (
    <AdminCard
      title={t("Details utilisateur")}
      subtitle={user.email}
      action={
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold text-slate-500 hover:text-slate-700"
        >
          {t("Fermer")}
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div>
          <p className="text-xs uppercase text-slate-400">{t("Profil")}</p>
          <p className="mt-2 text-sm text-slate-700">{user.name}</p>
          <p className="text-xs text-slate-500">{user.email}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.roles.map((role) => (
              <AdminBadge key={role} tone="info">
                {role}
              </AdminBadge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-400">{t("Historique evenements")}</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li className="text-slate-500">{t("Historique a brancher")}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-400">{t("Historique services")}</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li className="text-slate-500">{t("Historique a brancher")}</li>
          </ul>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-xs uppercase text-slate-400">{t("Historique actions admin")}</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          <li className="text-slate-500">{t("Journal admin a brancher")}</li>
        </ul>
      </div>
    </AdminCard>
  );
};

export default UserDetailsCard;
