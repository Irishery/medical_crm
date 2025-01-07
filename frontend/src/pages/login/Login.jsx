import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library
import "./css/Login.css";

function Login() {
    const [username, setUsername] = useState(""); // Changed from email to username
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: username, // Changed key to username
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.access_token;

                // Store the token in localStorage
                localStorage.setItem("token", token);

                // Decode the token to extract the role
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;

                // Redirect based on the role
                if (userRole === "admin") {
                    navigate("/admin/schedule");
                } else if (userRole === "doctor") {
                    navigate("/doctor");
                } else {
                    console.log(decodedToken)
                    console.log("Unknown role:", userRole);
                    setError("Unknown role. Please contact support.");
                }
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div id="login-container">
            <div id="inputs">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text" // Changed from email to text
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <input type="submit" value="Login" />
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
}

export default Login;
