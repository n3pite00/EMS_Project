import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"
import { auth } from '../firebase/Config'
import "../styles/header.css";

function Header() {

    const navigate = useNavigate()

    const Logout = () => {
        signOut(auth).then(() => {
            navigate("/")
            }) .catch ((error) => {
                console.error("Uloskirjautumisessa tapahtui virhe", error)
            })
    }

    return (
        <nav className="navbar">
            <h2>Tervetuloa Teppo!</h2>
            <ul>
                <li><Link to="/dashboard">Koti</Link></li>
                <li><Link to="/WorkCalendar">Työajankirjaus</Link></li>
                <li><Link to="/employees">Työntekijät</Link></li>
                <li><Link to="/leave-requests">Lomapyyntö</Link></li>
                <li><Link to="/Settings">Asetukset</Link></li>
            </ul>
            <button onClick={Logout}>Kirjaudu ulos</button>
        </nav>
    );
}

export default Header;
