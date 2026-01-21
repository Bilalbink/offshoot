import { createBrowserRouter, redirect } from "react-router-dom";
import authService from "./services/auth.service";

// Layouts
import { RootLayout } from "./components/layouts/RootLayout";
import { ProtectedLayout } from "./components/layouts/ProtectedLayout";

// Pages
import Login from "./pages/Login";
import AuthCallback from "./pages/Callback";
import Dashboard from "./pages/Dashboard";

const protectedLoader = async () => {
    if (!authService.isAuthenticated()) {
        throw redirect("/");
    }
    return null;
};

const publicLoader = async () => {
    if (authService.isAuthenticated()) {
        throw redirect("/dashboard");
    }
    return null;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            // Public routes
            {
                index: true,
                element: <Login />,
                loader: publicLoader,
            },
            {
                path: "auth/callback",
                element: <AuthCallback />,
            },

            // Protected routes
            {
                element: <ProtectedLayout />,
                loader: protectedLoader,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <div>404 - Not Found</div>,
    },
]);
