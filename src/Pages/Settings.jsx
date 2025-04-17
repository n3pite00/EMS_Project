import React from "react";
import Header from "../components/header";
import { useTranslation } from "react-i18next";
import "../styles/Settings.css";

function SiteSettings() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <Header />
      <div className="settings-container">
        <h2>{t("siteSettings")}</h2>
        <div className="language-switch">
          <p>{t("chooseLanguage")}</p>
          <button onClick={() => changeLanguage("fi")}>Suomi</button>
          <button onClick={() => changeLanguage("en")}>English</button>
        </div>
      </div>
    </div>
  );
}

export default SiteSettings;
