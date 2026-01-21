import PlaylistsView from "./components/PlaylistsView";
import { useSpotifyPlaylists } from "../../hooks/spotifyHooks";

const PlaylistSplitter = () => {
    const { data: playlists, isLoading, error } = useSpotifyPlaylists();

    return (
        <div className="min-h-screen bg-base-300">
            <div className="container mx-auto p-8 max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mt-12 text-center">
                        Select playlist to split
                    </h1>
                </div>
                <PlaylistsView
                    isLoading={isLoading}
                    playlists={playlists}
                    error={error}
                />
            </div>
        </div>
    );
};

export default PlaylistSplitter;
