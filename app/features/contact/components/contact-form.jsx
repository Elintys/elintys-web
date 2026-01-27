"use client";

import { useState } from "react";
import { useLanguage } from "../../../i18n/language-provider";

const DEFAULT_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = ({ titleKey, submitLabelKey, successMessageKey }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleChange = (field) => (event) => {
    const nextValue = event.target.value;
    setForm((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = t("contact.form.validation.required");
    if (!form.email.trim()) {
      nextErrors.email = t("contact.form.validation.required");
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = t("contact.form.validation.invalidEmail");
    }
    if (!form.subject.trim()) nextErrors.subject = t("contact.form.validation.required");
    if (!form.message.trim()) nextErrors.message = t("contact.form.validation.required");

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    setSubmitted(true);
    setForm(DEFAULT_FORM);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{t(titleKey)}</h3>
      <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="fullName">
            {t("contact.form.field.fullName.label")}
          </label>
          <input
            id="fullName"
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder={t("contact.form.field.fullName.placeholder")}
          />
          {errors.name ? (
            <p className="mt-2 text-xs text-red-600">{errors.name}</p>
          ) : null}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            {t("contact.form.field.email.label")}
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder={t("contact.form.field.email.placeholder")}
          />
          {errors.email ? (
            <p className="mt-2 text-xs text-red-600">{errors.email}</p>
          ) : null}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="subject">
            {t("contact.form.field.subject.label")}
          </label>
          <input
            id="subject"
            type="text"
            value={form.subject}
            onChange={handleChange("subject")}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder={t("contact.form.field.subject.placeholder")}
          />
          {errors.subject ? (
            <p className="mt-2 text-xs text-red-600">{errors.subject}</p>
          ) : null}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="message">
            {t("contact.form.field.message.label")}
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={handleChange("message")}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder={t("contact.form.field.message.placeholder")}
          />
          {errors.message ? (
            <p className="mt-2 text-xs text-red-600">{errors.message}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-indigo-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800"
        >
          {t(submitLabelKey)}
        </button>
        {submitted ? (
          <p className="text-sm text-green-700" role="status" aria-live="polite">
            {t(successMessageKey)}
          </p>
        ) : null}
      </form>
    </div>
  );
};

export default ContactForm;
