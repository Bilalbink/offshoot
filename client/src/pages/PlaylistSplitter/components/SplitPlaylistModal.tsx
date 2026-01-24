import { useState } from "react";

type SplitPlaylistModalProps = {
    createPlaylist: (playlistName: string, description: string) => void;
    isSplitPlaylistLoading: boolean;
};

const SplitPlaylistModal = ({
    createPlaylist,
    isSplitPlaylistLoading,
}: SplitPlaylistModalProps) => {
    const [playlistName, setPlaylistName] = useState("");
    const [description, setDescription] = useState("");

    // TODO: Add validation to user input
    // TODO: Clear states on render
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!playlistName) {
            return;
        }
        createPlaylist(playlistName, description);
    };

    return (
        <dialog
            id="split-playlist-modal"
            className="modal modal-bottom modal-middle "
        >
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Playlist Name"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        className="input input-ghost focus:outline-none focus:ring-0 text-3xl"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-6 input input-ghost focus:outline-none focus:ring-0"
                    />
                    <div className="modal-action">
                        <button
                            type="submit"
                            className="btn btn-primary min-w-35"
                            disabled={!playlistName}
                        >
                            {isSplitPlaylistLoading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                "Create Playlist"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default SplitPlaylistModal;
