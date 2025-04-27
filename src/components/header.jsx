import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../firebase/Config';
import "../styles/header.css";
import { useTranslation } from "react-i18next";
import useUserRole from '../components/useUserRole';

function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userEmail, setUserEmail] = useState(null);
  const userRole = useUserRole();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const Logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.error(t("logoutError"), error);
    });
  };

  return (
    <nav className="navbar">
      <h2>{userEmail}</h2>
      <ul>
        <li><Link to="/dashboard">{t("home")}</Link></li>
        <li><Link to="/WorkCalendar">{t("workCalendar")}</Link></li>
        <li><Link to="/leave-requests">{t("leaveRequest")}</Link></li>
        {userRole !== 'guest' && (userRole === null || userRole === undefined || userRole !== '') && (
          <li><Link to="/employees">{t("employees")}</Link></li>
        )}
        <li><Link to="/Settings">{t("settings")}</Link></li>
        <li><Link to="/TermsofService">{t("Terms of Service")}</Link></li>
      </ul>
      <button onClick={Logout}>{t("logout")}</button>
    </nav>
  );
}

export default Header;