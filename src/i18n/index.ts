import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import es from "./locales/es.json";

export const SUPPORTED_LANGUAGES = ["fr", "en", "es"] as const;
export type Lang = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = "lmdp-lang";

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    es: { translation: es },
  },
  // The server always renders French; the client corrects to the visitor's
  // language right after mount (see applyDetectedLanguage) so SSR and the
  // first client render match and React doesn't throw a hydration mismatch.
  lng: "fr",
  fallbackLng: "fr",
  supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
  interpolation: { escapeValue: false },
});

export function applyDetectedLanguage() {
  if (typeof window === "undefined") return;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) {
      if (stored !== i18n.language) void i18n.changeLanguage(stored);
      return;
    }
    const browserLang = (navigator.language || "fr").slice(0, 2).toLowerCase();
    const matched = (SUPPORTED_LANGUAGES as readonly string[]).includes(browserLang)
      ? (browserLang as Lang)
      : "fr";
    if (matched !== i18n.language) void i18n.changeLanguage(matched);
    window.localStorage.setItem(STORAGE_KEY, matched);
  } catch {
    // localStorage unavailable (private mode, etc.) — stay on default "fr".
  }
}

export function setLanguage(lang: Lang) {
  void i18n.changeLanguage(lang);
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore
  }
}

export default i18n;
