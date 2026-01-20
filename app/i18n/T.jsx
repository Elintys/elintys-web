"use client";

import { useLanguage } from "./LanguageProvider";

export default function T({ k }) {
  const { t } = useLanguage();
  return t(k);
}
