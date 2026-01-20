import authService from "../../services/auth.service";

const Dashboard = () => {
    const handleLogout = () => {
        authService.logout();
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout Spotify</button>
        </div>
    );
};

export default Dashboard;
