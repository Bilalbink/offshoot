import { useState } from "react";
import PlaylistsView from "./components/PlaylistsView";
import TrackView from "./components/TracksView";
import { useSpotifyPlaylists } from "../../hooks/spotifyHooks";
import { type SpotifyPlaylist } from "../../types";

const PlaylistSplitter = () => {
    const { playlists, isGetPlaylistsLoading, error } = useSpotifyPlaylists();
    const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);

    const selectPlaylist = (playlist: SpotifyPlaylist) => {
        setPlaylist(playlist);
    };

    const resetSelectedPlaylist = () => {
        setPlaylist(null);
    };

    return (
        <div className="min-h-screen bg-base-300">
            <div className="container mx-auto p-8 max-w-3xl">
                <div className="mb-8 mt-12">
                    {playlist && (
                        <button
                            className="btn btn-ghost text-primary mb-4"
                            onClick={() => resetSelectedPlaylist()}
                        >
                            Go Back
                        </button>
                    )}
                    <h1 className="text-3xl font-bold text-center">
                        {playlist
                            ? `Split Playlist: ${playlist.name}`
                            : "Select playlist to split"}
                    </h1>
                </div>
                {playlist ? (
                    <TrackView playlist={playlist} />
                ) : (
                    <PlaylistsView
                        isLoading={isGetPlaylistsLoading}
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
