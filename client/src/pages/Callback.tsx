import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

function Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        if (code) {
            // Exchange code for token via backend
            axios
                .post(`${API_URL}/api/auth/token`, { code, state })
                .then((response) => {
                    const { access_token, refresh_token } = response.data;

                    // Store tokens (localStorage, context, etc.)
                    localStorage.setItem("spotify_access_token", access_token);
                    localStorage.setItem(
                        "spotify_refresh_token",
                        refresh_token
                    );

                    // Redirect to main app
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Token exchange failed", error);
                    navigate("/?error=auth_failed");
                });
        }
    }, [searchParams, navigate]);

    return <div>Authenticating...</div>;
}

export default Callback;
