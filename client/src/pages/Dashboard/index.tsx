import { useAuth } from "../../contexts/AuthContext";
import { useSpotifyProfile } from "../../hooks/useSpotifyProfile";
// import ProfileCard from '../components/ProfileCard';
// import ToolCard from '../components/ToolCard';

const Dashboard = () => {
    const { authService } = useAuth();
    const { data: profile, isLoading, error } = useSpotifyProfile();

    const handleLogout = async () => {
        await authService.logout();
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-base-300">
            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-lg">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">
                        <span className="text-success">Spotify</span> Tools
                    </a>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            {/* <div className="w-10 rounded-full">
                                {profile?.images?.[0] ? (
                                    <img
                                        src={profile.images[0].url}
                                        alt={userName}
                                    />
                                ) : (
                                    <div className="bg-neutral flex items-center justify-center w-full h-full">
                                        <span className="text-xl">
                                            {userName}
                                        </span>
                                    </div>
                                )}
                            </div> */}
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-5xl font-bold mb-2">
                        Welcome back,{" "}
                        {/* <span className="text-success">{userName}</span>! 👋 */}
                    </h1>
                    <p className="text-base-content/60 text-lg">
                        Choose a tool to enhance your Spotify experience
                    </p>
                </div>

                {/* Spotify Profile Card */}
                {isLoading ? (
                    <div className="card bg-base-100 shadow-xl mb-8">
                        <div className="card-body">
                            <div className="flex items-center gap-4">
                                <div className="skeleton h-20 w-20 rounded-full shrink-0"></div>
                                <div className="flex-1">
                                    <div className="skeleton h-6 w-48 mb-2"></div>
                                    <div className="skeleton h-4 w-64"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-error mb-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Failed to load profile: {error.message}</span>
                    </div>
                ) : profile ? (
                    <div className="mb-8">
                        {/* <ProfileCard profile={profile} /> */}
                    </div>
                ) : null}

                {/* Tools Section */}
                <div className="mb-4">
                    <h2 className="text-3xl font-bold">Choose a Tool</h2>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ToolCard 
                        to="/playlist-splitter" 
                        icon="📂" 
                        title="Playlist Splitter"
                        description="Split your playlists into smaller, organized collections"
                    />
                    <ToolCard 
                        to="/monthly-wrap" 
                        icon="📊" 
                        title="Monthly Wrap"
                        description="View your listening stats for the past month"
                    />
                    <ToolCard 
                        to="/discover" 
                        icon="🎵" 
                        title="Discover Music"
                        description="Get personalized music recommendations"
                    />
                </div> */}
            </div>
        </div>
    );
};

export default Dashboard;
