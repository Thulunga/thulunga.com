"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { localizationService, type SupportedLang } from "./localization";

interface LanguageContextValue {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  localize: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<SupportedLang>("en");

  const setLang = useCallback((newLang: SupportedLang) => {
    localizationService.setLanguage(newLang);
    setLangState(newLang);
  }, []);

  const localize = useCallback((key: string) => localizationService.localize(key), [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, localize }}>{children}</LanguageContext.Provider>;
}

export function useLocalize() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLocalize must be used inside <LanguageProvider>");
  return ctx;
}
