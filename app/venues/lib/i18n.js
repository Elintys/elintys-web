import en from "../../i18n/en";
import fr from "../../i18n/fr";

const dictionaries = { en, fr };

export function resolveLocale(searchParams) {
  const lang = typeof searchParams?.lang === "string" ? searchParams.lang : "";
  return lang === "en" ? "en" : "fr";
}

export function getMessage(locale, key) {
  const dictionary = dictionaries[locale] || dictionaries.fr;
  if (dictionary && Object.prototype.hasOwnProperty.call(dictionary, key)) {
    return dictionary[key];
  }
  return key;
}

export function formatMessage(template, values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, token) => {
    return Object.prototype.hasOwnProperty.call(values, token)
      ? values[token]
      : `{${token}}`;
  });
}
