"use client";

import { useLanguage } from "../../../i18n/LanguageProvider";

export default function StepperHeader({ steps, currentStep }) {
  const { t } = useLanguage();
  const progress = Math.round((currentStep / (steps.length - 1)) * 100);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isDone = index < currentStep;
          return (
            <div key={step} className="flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full border ${
                  isDone || isActive
                    ? "border-indigo-600 text-indigo-600"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {isDone ? "✓" : index + 1}
              </span>
              <span className={isActive ? "text-gray-900 font-semibold" : ""}>
                {t(step)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
