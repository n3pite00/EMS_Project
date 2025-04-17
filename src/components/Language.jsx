import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fi: {
    translation: {
      siteSettings: "Sivun asetukset",
      chooseLanguage: "Valitse kieli",
    },
  },
  en: {
    translation: {
      siteSettings: "Site Settings",
      chooseLanguage: "Choose language",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fi", 
  fallbackLng: "fi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
