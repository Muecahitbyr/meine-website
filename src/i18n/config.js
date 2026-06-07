import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import deCommon from "./de/common.json";

i18n.use(initReactI18next).init({
  resources: {
    de: { common: deCommon },
  },
  lng: "de",
  fallbackLng: "de",
  defaultNS: "common",
  ns: ["common"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
