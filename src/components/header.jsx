import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"
import { auth } from '../firebase/Config'
import "../styles/header.css";
import { useTranslation } from "react-i18next";

function Header() {
    const navigate = useNavigate()
    const { t } = useTranslation();

    const Logout = () => {
        signOut(auth).then(() => {
            navigate("/")
        }).catch((error) => {
            console.error(t("logoutError"), error)
        })
    }

    return (
        <nav className="navbar">
            <h2>{t("welcomeUser", { name: "Teppo" })}</h2>
            <ul>
                <li><Link to="/dashboard">{t("home")}</Link></li>
                <li><Link to="/WorkCalendar">{t("workCalendar")}</Link></li>
                <li><Link to="/employees">{t("employees")}</Link></li>
                <li><Link to="/leave-requests">{t("leaveRequest")}</Link></li>
                <li><Link to="/Settings">{t("settings")}</Link></li>
            </ul>
            <button onClick={Logout}>{t("logout")}</button>
        </nav>
    );
}

export default Header;
