import brx from "@/locales/brx";
import en from "@/locales/en";

export type SupportedLang = "en" | "brx";

const LOCALES: Record<SupportedLang, Record<string, string>> = { en, brx };

class LocalizationService {
  private lang: SupportedLang = "en";

  setLanguage(lang: SupportedLang) {
    this.lang = lang;
  }

  getLanguage(): SupportedLang {
    return this.lang;
  }

  localize(key: string): string {
    const locale = LOCALES[this.lang];
    if (locale[key] !== undefined) return locale[key];

    if (en[key] !== undefined) {
      console.warn(
        `[i18n] Missing key "${key}" in locale "${this.lang}". Falling back to English.`
      );
      return en[key];
    }

    console.error(`[i18n] Key "${key}" not found in any locale.`);
    return key;
  }
}

export const localizationService = new LocalizationService();
