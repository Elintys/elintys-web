"use client";

import { useLanguage } from "./language-provider";

export default function T({ k }) {
  const { t } = useLanguage();
  return t(k);
}
