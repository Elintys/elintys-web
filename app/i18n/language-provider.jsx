"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import en from "./en";
import fr from "./fr";

const messages = { en, fr };
const DEFAULT_LANGUAGE = "fr";
const STORAGE_KEY = "elintys-language";

const LanguageContext = createContext(null);

const resolveLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && messages[stored]) return stored;
  const browser = window.navigator?.language?.split("-")[0];
  if (browser && messages[browser]) return browser;
  return DEFAULT_LANGUAGE;
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    const nextLanguage = resolveLanguage();
    setLanguage(nextLanguage);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, language);
    }
  }, [language]);

  const changeLanguage = useCallback((nextLanguage) => {
    if (messages[nextLanguage]) {
      setLanguage(nextLanguage);
    }
  }, []);

  const t = useCallback(
    (key) => {
      const dictionary = messages[language] || {};
      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        return dictionary[key];
      }
      return key;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage: changeLanguage,
      t,
    }),
    [language, changeLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider.");
  }
  return context;
}
