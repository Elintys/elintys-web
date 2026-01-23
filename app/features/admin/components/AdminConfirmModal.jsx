"use client";

import { useEffect } from "react";
import { useLanguage } from "../../../i18n/LanguageProvider";

export default function AdminConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
  children,
}) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onCancel?.();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">{t(title)}</h3>
        {description && (
          <p className="mt-2 text-sm text-slate-600">{t(description)}</p>
        )}
        {children && <div className="mt-4">{children}</div>}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t(cancelLabel)}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            {t(confirmLabel)}
          </button>
        </div>
      </div>
    </div>
  );
}
