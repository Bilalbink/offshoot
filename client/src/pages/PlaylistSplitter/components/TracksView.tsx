import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { type SpotifyPlaylist } from "../../../types";
import {
    useSpotifyPlaylistTracks,
    useSplitPlaylist,
} from "../../../hooks/spotifyHooks";
import SplitPlaylistModal from "./SplitPlaylistModal";

type TrackViewProps = {
    playlist: SpotifyPlaylist;
};
const TrackView = ({ playlist }: TrackViewProps) => {
    const navigate = useNavigate();

    const { tracks, availableGenres, isLoading, error } =
        useSpotifyPlaylistTracks(playlist.id);
    const {
        splitPlaylist,
        isSplitPlaylistLoading,
        setSplitPlaylistError,
        splitPlaylistError,
    } = useSplitPlaylist();

    const { spotifyUserId } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const modal = document.getElementById("split-playlist-modal");
    const tracksPerPage = 20;

    // Filter tracks by selected genre
    const filteredTracks = useMemo(() => {
        if (!tracks) return [];

        if (!selectedGenre) return tracks;

        return tracks.filter((track) =>
            track.track.artists.some((artist) =>
                artist.genres?.includes(selectedGenre),
            ),
        );
    }, [tracks, selectedGenre]);

    // Pagination calculations
    const totalTracks = filteredTracks.length;
    const totalPages = Math.ceil(totalTracks / tracksPerPage);
    const startIndex = (currentPage - 1) * tracksPerPage;
    const endIndex = startIndex + tracksPerPage;
    const currentTracks = filteredTracks.slice(startIndex, endIndex);

    // TODO: make a shared notification component
    useEffect(() => {
        if (!splitPlaylistError) return;

        const timer = setTimeout(() => {
            setSplitPlaylistError(null);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer); // cleanup if component unmounts
    }, [splitPlaylistError]);

    // Reset to page 1 when filter changes
    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
        setCurrentPage(1);
    };

    const toggleModal = () => {
        if (modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    };

    const createPlaylist = async (
        playlistName: string,
        description: string,
    ) => {
        const filteredSongUris = filteredTracks.map(
            (track) => `spotify:track:${track.track.id}`,
        );

        if (spotifyUserId) {
            await splitPlaylist(
                spotifyUserId,
                playlistName,
                description,
                filteredSongUris,
            );

            navigate("/dashboard");
        }
    };

    return (
        <div>
            {/* Alert TODO: incorrect error message displayed*/}
            {splitPlaylistError && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-error">
                        <span>{splitPlaylistError.message}</span>
                    </div>
                </div>
            )}
            {/* Modal */}
            <SplitPlaylistModal
                createPlaylist={createPlaylist}
                isSplitPlaylistLoading={isSplitPlaylistLoading}
            />
            {isLoading ? (
                <div className="w-full flex flex-row items-center justify-center text-2xl">
                    Getting tracks
                    <span className="ml-5 loading loading-ring loading-xl text-primary"></span>
                </div>
            ) : (
                <div>
                    {/* Filters and Stats */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                        {/* Left side - Stats and Button */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="text-sm text-base-content/60 whitespace-nowrap">
                                Total Tracks:{" "}
                                <span className="font-bold">{totalTracks}</span>
                            </div>
                            {selectedGenre && (
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => toggleModal()}
                                >
                                    Split Playlist
                                </button>
                            )}
                        </div>

                        {/* Right side - Genre Filter */}
                        <div className="form-control w-full md:max-w-xs">
                            <select
                                className="select select-bordered w-full"
                                value={selectedGenre}
                                onChange={(e) =>
                                    handleGenreChange(e.target.value)
                                }
                                disabled={isLoading}
                            >
                                <option value="">All Genres</option>
                                {availableGenres?.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Album</th>
                                    <th>Artist</th>
                                    <th>Genre</th>
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
                                    <span>Failed to load playlist tracks</span>
                                </div>
                            ) : (
                                <tbody>
                                    {currentTracks?.map((track) => (
                                        <tr key={track.track.id}>
                                            <td>
                                                <div className=" flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={
                                                                    track.track
                                                                        .album
                                                                        .images[0]
                                                                        .url
                                                                }
                                                                alt={
                                                                    track.track
                                                                        .album
                                                                        .name
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">
                                                            {track.track.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{track.track.album.name}</td>
                                            <td>
                                                {track.track.artists
                                                    .map(
                                                        (artist) => artist.name,
                                                    )
                                                    .join(", ")}
                                            </td>
                                            <td>
                                                {track.track.artists
                                                    .map(
                                                        (artist) =>
                                                            artist.genres,
                                                    )
                                                    .join(", ")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            )}
            {/* Pagination */}
            {!isLoading && !error && totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-base-content/60">
                        Showing {startIndex + 1} -{" "}
                        {Math.min(endIndex, totalTracks)} of {totalTracks}
                    </div>

                    <div className="join">
                        <button
                            className="join-item btn btn-sm"
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                        >
                            «
                        </button>

                        {/* Page numbers */}
                        {Array.from(
                            { length: Math.min(5, totalPages) },
                            (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        className={`join-item btn btn-sm ${
                                            currentPage === pageNum
                                                ? "btn-primary"
                                                : ""
                                        }`}
                                        onClick={() => setCurrentPage(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            },
                        )}

                        <button
                            className="join-item btn btn-sm"
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(totalPages, prev + 1),
                                )
                            }
                            disabled={currentPage === totalPages}
                        >
                            »
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackView;
