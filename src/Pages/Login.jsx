import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/Config"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
      
    const signIn = async() => {
        try {
      
            await signInWithEmailAndPassword(auth, email, password)
            console.log("Login was successful!")
            navigate("/Dashboard")
      
            } catch (err){
                alert("Login wasn't successful.")
            }
        }
        
      
        return (
            <>
            <h1>Sign In!</h1>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                type="email"
            />

            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                type="password"
            />

            <button
                onClick={signIn}
            > 
            Sign In
            </button>
            </>
      );
    }

export default Login;
