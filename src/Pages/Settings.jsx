import React from "react";
import Header from "../components/header";
import "../styles/Settings.css";

function SiteSettings() {
  const changeLanguage = (lng) => {
    localStorage.setItem("language", lng);
    window.location.reload();
  };

  return (
    <div>
      <Header />
      <div className="settings-container">
        <h2>Sivuston asetukset</h2>
        <div className="language-switch">
          <p>Valitse kieli</p>
          <button onClick={() => changeLanguage("fi")}>Suomi</button>
          <button onClick={() => changeLanguage("en")}>English</button>
        </div>
      </div>
    </div>
  );
}

export default SiteSettings;
