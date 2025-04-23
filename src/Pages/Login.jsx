import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/Config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const q = query(collection(db, "Employee"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      let role = null; 

      if (!querySnapshot.empty) {
        const employeeData = querySnapshot.docs[0].data();
        if (employeeData.role === "guest") {
          role = "guest";
        } else if (employeeData.role === "admin") {
          role = "admin";
        }
      }

      localStorage.setItem("userRole", role || 'regular'); 

      if (role === "admin") {
        navigate("/Dashboard");
      } else if (role === "guest") {
        navigate("/Dashboard"); 
      } else {
        navigate("/Dashboard"); 
      }

    } catch (err) {
      console.error(err);
      alert(t("loginFailed"));
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="Login-page">
      <div className="Login-form">
        <h1>{t("login")}</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder={t("email")}
          type="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder={t("password")}
          type="password"
        />
        <button onClick={signIn}>{t("loginButton")}</button>
        <p>
          <Link to="/UpdatePassword">{t("forgotPassword")}</Link>
        </p>
        <div className="language-switch">
          <button onClick={() => changeLanguage("fi")}>Suomi</button>
          <button onClick={() => changeLanguage("en")}>English</button>
        </div>
      </div>
    </div>
  );
}

export default Login;