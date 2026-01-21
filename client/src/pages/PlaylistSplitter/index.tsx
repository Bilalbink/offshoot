import { useState } from "react";
import PlaylistsView from "./components/PlaylistsView";
import TrackView from "./components/TracksView";
import { useSpotifyPlaylists } from "../../hooks/spotifyHooks";
import { type SpotifyPlaylist } from "../../types";

const PlaylistSplitter = () => {
    const { data: playlists, isLoading, error } = useSpotifyPlaylists();
    const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);

    const selectPlaylist = (playlist: SpotifyPlaylist) => {
        setPlaylist(playlist);
    };

    return (
        <div className="min-h-screen bg-base-300">
            <div className="container mx-auto p-8 max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mt-12 text-center">
                        {playlist
                            ? `Split Playlist: ${playlist.name}`
                            : "Select playlist to split"}
                    </h1>
                </div>
                {playlist ? (
                    <TrackView playlist={playlist} />
                ) : (
                    <PlaylistsView
                        isLoading={isLoading}
                        playlists={playlists}
                        error={error}
                        selectPlaylist={selectPlaylist}
                    />
                )}
            </div>
        </div>
    );
};

export default PlaylistSplitter;
