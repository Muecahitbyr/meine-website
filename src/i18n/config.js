import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import deCommon from "./de/common.json";
import enCommon from "./en/common.json";
import trCommon from "./tr/common.json";

const STORAGE_KEY = "lang";

i18n.use(initReactI18next).init({
  resources: {
    de: { common: deCommon },
    en: { common: enCommon },
    tr: { common: trCommon },
  },
  lng: "de",
  fallbackLng: "de",
  defaultNS: "common",
  ns: ["common"],
  interpolation: {
    escapeValue: false,
  },
});

export function setLanguage(lang) {
  i18n.changeLanguage(lang);
  localStorage.setItem(STORAGE_KEY, lang);
}

export default i18n;
