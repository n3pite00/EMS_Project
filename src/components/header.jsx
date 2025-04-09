import React from "react";
import "../styles/header.css"

function Header() {
    return (
        <nav className="navbar">
            <h2>Tervetuloa Teppo!</h2>
                <ul>
                    <li><a href="/dashboard">Koti</a></li>
                    <li><a href="/">Työajankirjaus</a></li>
                    <li><a href="/">Työntekijät</a></li>
                    <li><a href="/">Asetukset</a></li>
                </ul>
            <button>Sign out</button>
        </nav>
    )
}

export default Header