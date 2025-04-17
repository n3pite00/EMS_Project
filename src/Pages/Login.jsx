import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/Config"
import "../styles/Login.css"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
    
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log("Kirjautuminen onnistui!")
      navigate("/Dashboard")
    } catch (err) {
      alert("Kirjautuminen epäonnistui.")
    }
  }

  return (
    <div className="Login-page">
      <div className="Login-form">
        <h1>Kirjaudu sisään</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Sähköposti"
          type="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Salasana"
          type="password"
        />
        <button onClick={signIn}>Kirjaudu</button>
        <p>
          <Link to="/UpdatePassword">Unohditko salasanan?</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
