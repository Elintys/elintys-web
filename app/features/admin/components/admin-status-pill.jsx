"use client";

const statusToneMap = {
  ACTIVE: "success",
  SUSPENDED: "danger",
  PENDING: "warning",
  VERIFIED: "success",
  UNVERIFIED: "neutral",
  DRAFT: "neutral",
  PENDING_REVIEW: "warning",
  PUBLISHED: "success",
  REJECTED: "danger",
  OPEN: "warning",
  RESOLVED: "success",
};

export default function AdminStatusPill({ status }) {
  const tone = statusToneMap[status] || "neutral";
  const toneClasses = {
    neutral: "bg-slate-100 text-slate-600",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-rose-100 text-rose-700",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
      {status}
    </span>
  );
}
