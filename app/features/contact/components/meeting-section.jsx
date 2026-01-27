import Link from "next/link";

const MeetingSection = ({ title, description, ctaLabel, ctaHref }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-3 text-sm text-gray-600">{description}</p>
    <Link
      href={ctaHref}
      className="mt-6 inline-flex items-center justify-center rounded-full border border-indigo-200 px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-50"
    >
      {ctaLabel}
    </Link>
  </div>
);

export default MeetingSection;
