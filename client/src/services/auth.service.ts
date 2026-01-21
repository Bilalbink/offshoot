const API_URL = import.meta.env.VITE_API_URL!;

const authService = {
    loginWithSpotify: () => {
        // Redirect to backend OAuth endpoint
        window.location.href = `${API_URL}/auth/spotify`;
    },

    logout: () => {
        localStorage.removeItem("auth_token");
        window.location.href = "/";
    },

    getToken: (): string | null => {
        return localStorage.getItem("auth_token");
    },

    setToken: (token: string) => {
        localStorage.setItem("auth_token", token);
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem("auth_token");
    },
};

export default authService;
