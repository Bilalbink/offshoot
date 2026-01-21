import { type SpotifyPlaylist } from "../../../types";

type PlaylistsViewProps = {
    isLoading: boolean;
    playlists: SpotifyPlaylist[] | null;
    error: Error | null;
};

const PlaylistsView = ({ isLoading, playlists, error }: PlaylistsViewProps) => {
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
                {isLoading ? (
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
                            <tr>
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
                                    <button className="btn btn-primary btn-xs">
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
