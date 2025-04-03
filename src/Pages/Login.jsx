import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate(); 

    const handleLogin = () => {

        navigate("/dashboard");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Testi</h1>
            <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                Login
            </button>
        </div>
    );
}

export default Login;
