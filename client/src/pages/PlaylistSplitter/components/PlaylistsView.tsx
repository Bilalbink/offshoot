import { type SpotifyPlaylist } from "../../../types";

type PlaylistsViewProps = {
    isLoading: boolean;
    playlists: SpotifyPlaylist[] | null;
    error: Error | null;
    selectPlaylist: (playlist: SpotifyPlaylist) => void;
};

const PlaylistsView = ({
    isLoading,
    playlists,
    error,
    selectPlaylist,
}: PlaylistsViewProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Playlist Name</th>
                        <th>Owner</th>
                        <th></th>
                    </tr>
                </thead>
                {error ? (
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
                        <span>Failed to load playlists:</span>
                    </div>
                ) : isLoading ? (
                    <tbody className="gap-5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index} className="mb-5">
                                <td className="skeleton h-10"></td>
                                <td className="skeleton h-10"></td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        {playlists?.map((playlist) => (
                            <tr key={playlist.id}>
                                <td>
                                    <div className=" flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={playlist.images[0].url}
                                                    alt={playlist.name}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {playlist.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{playlist.owner.display_name}</td>
                                <th>
                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={() => selectPlaylist(playlist)}
                                    >
                                        Select
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default PlaylistsView;
