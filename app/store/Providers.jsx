"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { LanguageProvider } from "../i18n/language-provider";

export default function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <LanguageProvider>{children}</LanguageProvider>
    </Provider>
  );
}
