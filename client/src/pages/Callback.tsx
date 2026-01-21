import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authService from "../services/auth.service";

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
            console.error("Auth error:", error);
            navigate("?error=" + error);
            return;
        }

        if (token) {
            // Save JWT token
            authService.setToken(token);
            navigate("/dashboard");
        } else {
            navigate("?error=no_token");
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div>Completing authentication...</div>
        </div>
    );
};

export default AuthCallback;
