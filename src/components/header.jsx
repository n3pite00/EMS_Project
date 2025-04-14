import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
    return (
        <nav className="navbar">
            <h2>Tervetuloa Teppo!</h2>
            <ul>
                <li><Link to="/dashboard">Koti</Link></li>
                <li><Link to="/WorkCalendar">Työajankirjaus</Link></li>
                <li><Link to="/employees">Työntekijät</Link></li>
                <li><Link to="/Settings">Asetukset</Link></li>
            </ul>
            <button>Sign out</button>
        </nav>
    );
}

export default Header;
