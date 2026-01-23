"use client";

export default function AdminCard({ title, subtitle, action, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {(title || action) && (
        <div className="flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-sm font-semibold text-slate-700">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={title || action ? "mt-4" : ""}>{children}</div>
    </div>
  );
}
