"use client";

import { useState } from "react";

export default function EventDescription({ description }) {
  const [expanded, setExpanded] = useState(false);

  if (!description) {
    return null;
  }

  const preview = description.slice(0, 280);
  const shouldTruncate = description.length > 280;

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow p-6 space-y-3">
      <h2 className="text-xl font-semibold text-gray-900">Description</h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        {expanded || !shouldTruncate ? description : `${preview}...`}
      </p>
      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="text-sm text-indigo-600 hover:underline"
        >
          {expanded ? "Voir moins" : "Voir plus"}
        </button>
      )}
    </section>
  );
}
