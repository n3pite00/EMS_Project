import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase/Config"

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
            <>
            <h1>Reset password</h1>

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
            </>
      );   
}
export default UpdatePassword;
