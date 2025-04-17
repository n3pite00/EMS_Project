import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase/Config"
import "../styles/Login.css"

function UpdatePassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
    
  const ChangePassword = async () => {
    if (!email) {
      alert("Syötä sähköpostiosoite.")
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      alert("Salasanan palautuslinkki on lähetetty sähköpostiisi!")
      navigate("/")
    } catch (err) {
      alert("Virhe salasanan palautuksessa.")
    }
  }

  return (
    <div className="Login-page">
      <div className="Login-form">
        <h1>Palauta salasana</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Syötä sähköpostisi"
          type="email"
        />
        <button onClick={ChangePassword}>Lähetä palautuslinkki</button>
      </div>
    </div>
  )
}

export default UpdatePassword;
