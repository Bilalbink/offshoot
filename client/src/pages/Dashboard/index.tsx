import { useSpotifyProfile } from "../../hooks/spotifyHooks";
import ProfileCard from "./components/ProfileCard";
import ToolCard from "./components/ToolCard";

const Dashboard = () => {
    const { profile, isProfileLoading, error } = useSpotifyProfile();

    return (
        <div className="min-h-screen bg-base-300">
            <div className="container mx-auto p-8 max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-5xl font-bold mb-2">Welcome back</h1>
                </div>

                {/* Spotify Profile Card */}
                {isProfileLoading ? (
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
                        <ProfileCard profile={profile} />
                    </div>
                ) : null}

                {/* Tools Section */}
                <div className="mb-4">
                    <h2 className="text-3xl font-bold">Choose a Tool</h2>
                </div>

                <div className="flex flex-col items-center gap-5">
                    <ToolCard type="playlist-splitter" />
                    <ToolCard type="monthly-wrap" />
                    <ToolCard type="discover" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
