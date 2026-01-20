import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const { authService } = useAuth();

    const handleLogin = () => {
        authService.loginWithSpotify();
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold py-6">
                        Welcome to Offshoot
                    </h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleLogin()}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
