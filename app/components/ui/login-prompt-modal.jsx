"use client";

import { useEffect } from "react";
import { useLanguage } from "../../i18n/language-provider";

export default function LoginPromptModal({
  open,
  title = "Connexion requise",
  message = "Vous devez d'abord vous connecter pour continuer.",
  onConfirm,
  autoRedirectDelay = 1500,
}) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open || !onConfirm) return;
    const timer = window.setTimeout(() => {
      onConfirm();
    }, autoRedirectDelay);
    return () => window.clearTimeout(timer);
  }, [open, onConfirm, autoRedirectDelay]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900">{t(title)}</h3>
        <p className="mt-2 text-sm text-gray-600">
          {t(message)}
        </p>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            {t("Se connecter")}
          </button>
        </div>
      </div>
    </div>
  );
}
