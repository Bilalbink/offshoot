import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const user = await authService.getCurrentUser();

                if (user) {
                    navigate("/dashboard");
                } else {
                    navigate("/login?error=auth_failed");
                }
            } catch (error) {
                console.error("Auth callback error", error);
                navigate("/login?error=auth_failed");
            }
        };

        handleCallback();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <span className="loading loading-ring loading-xl text-primary"></span>
            </div>
        </div>
    );
};

export default AuthCallback;
