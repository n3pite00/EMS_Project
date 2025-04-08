import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase/Config"
import "../styles/Login.css"

function UpdatePassword() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
      
    const ChangePassword = async() => {
        if (!email) {
           alert("Please enter your email.")
           return
        }

        try {
            await sendPasswordResetEmail(auth, email)
            alert("Password reset link has been sent to your email!")
            navigate("/")

        } catch(err) {
            alert("Error in resetting password.")
        }
    }
      
        return (
            <div className="Login-page">
                <div className="Login-form">
                    <h1>Reset <br/> Password</h1>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email"
                        type="email"
                    />

                    <button
                        onClick={ChangePassword}
                    > 
                    Send reset email
                    </button>
                </div>
            </div>
      );   
}
export default UpdatePassword;
