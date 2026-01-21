import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const { authService } = useAuth();

    const handleLogin = () => {
        authService.loginWithSpotify();
    };

    return (
        <div className="hero min-h-screen bg-[url('/home-background.jpg')] bg-cover bg-center relative">
            <div className="hero-content text-center relative z-10">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold py-6 text-white">
                        Welcome to Offshoot
                    </h1>
                    <p className="text-lg">
                        Log in to your Spotify account to start!
                    </p>
                    <button
                        className="mt-8 btn btn-primary"
                        onClick={handleLogin}
                    >
                        Login With Spotify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
