import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserProvider } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
export const ProtectedLayout = () => {
    const { authService } = useAuth();

    const handleLogout = () => {
        authService.logout();
    };

    return (
        <div>
            <div className="navbar bg-neutral text-neutral-content justify-between">
                <Link to="/dashboard" className="btn btn-ghost text-xl">
                    Offshoot
                </Link>
                <button
                    className="btn btn-ghost text-md"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <main>
                <UserProvider>
                    <Outlet />
                </UserProvider>
            </main>
        </div>
    );
};
