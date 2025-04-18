import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/Config";
import { useTranslation } from "react-i18next";
import "../styles/Login.css";

function UpdatePassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const ChangePassword = async () => {
    if (!email) {
      alert(t("enterEmail"));
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert(t("resetLinkSent"));
      navigate("/");
    } catch (err) {
      alert(t("resetError"));
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="Login-page">
      <div className="Login-form">
        <h1>{t("resetPassword")}</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder={t("enterYourEmail")}
          type="email"
        />
        <button onClick={ChangePassword}>{t("sendResetLink")}</button>
        <div className="language-switch">
          <button onClick={() => changeLanguage("fi")}>Suomi</button>
          <button onClick={() => changeLanguage("en")}>English</button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
