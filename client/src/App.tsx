// src/App.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:3000";

function App() {
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Get Spotify auth URL from backend
            const response = await axios.get(`${API_URL}/api/auth/url`);
            // Redirect user to Spotify
            window.location.href = response.data.url;
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div>
            {!token ? (
                <button onClick={handleLogin}>Login with Spotify</button>
            ) : (
                <div>Logged in! Token: {token}</div>
            )}
        </div>
    );
}

export default App;
