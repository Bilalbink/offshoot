import axios from "axios";
import authService from "./auth.service";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL!,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor - Add JWT token
apiClient.interceptors.request.use((config) => {
    const token = authService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authService.logout();
        }
        return Promise.reject(error);
    },
);
