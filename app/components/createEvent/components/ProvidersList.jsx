import ProviderItem from "./ProviderItem";
import { useLanguage } from "../../../i18n/LanguageProvider";

export default function ProvidersList({ providers, onRemove, onUpdate }) {
  const { t } = useLanguage();
  if (!providers.length) {
    return <p className="text-sm text-gray-500">{t("Aucun prestataire ajoute.")}</p>;
  }

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <ProviderItem
          key={provider.id}
          provider={provider}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
