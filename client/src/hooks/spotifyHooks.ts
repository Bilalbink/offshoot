import { useState, useEffect } from "react";
import { usersApi } from "../api/users";
import { playlistsApi } from "../api/playlists";
import type {
    SpotifyPlaylist,
    SpotifyTrack,
    SpotifyUserProfile,
} from "../types";
import { useUser } from "../contexts/UserContext";

export const useSpotifyProfile = () => {
    const { setSpotifyUserId } = useUser();
    const [profile, setProfile] = useState<SpotifyUserProfile | null>(null);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsProfileLoading(true);
                const fetchedProfile = await usersApi.getSpotifyProfile();
                setProfile(fetchedProfile);
                setSpotifyUserId(fetchedProfile.id);
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsProfileLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { profile, isProfileLoading, error };
};

export const useSpotifyPlaylists = () => {
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[] | null>(null);
    const [isGetPlaylistsLoading, setIsGetPlaylistsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                setIsGetPlaylistsLoading(true);
                const allPlaylists = await playlistsApi.getUserPlaylists();
                setPlaylists(allPlaylists);
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsGetPlaylistsLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    return { playlists, isGetPlaylistsLoading, error };
};

export const useSpotifyPlaylistTracks = (playlistId: string) => {
    const [tracks, setTracks] = useState<SpotifyTrack[] | null>(null);
    const [availableGenres, setAvailableGenres] = useState<string[] | null>(
        null,
    );

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPlaylistTracks = async () => {
            try {
                setIsLoading(true);
                const {
                    tracks: fetchedTracks,
                    availableGenres: fetchedAvailableGenres,
                } = await playlistsApi.getPlaylistTracks(playlistId);
                setTracks(fetchedTracks);
                setAvailableGenres(fetchedAvailableGenres);

                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaylistTracks();
    }, []);

    return { tracks, availableGenres, isLoading, error };
};

export const useSplitPlaylist = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [snapshotId, setSnapshotId] = useState<string | null>(null);
    const [isSplitPlaylistLoading, setIsSplitPlaylistLoading] = useState(false);
    const [splitPlaylistError, setSplitPlaylistError] = useState<Error | null>(
        null,
    );

    const splitPlaylist = async (
        spotifyUserId: string,
        playlistName: string,
        description: string,
        songUris: string[],
    ) => {
        try {
            setIsSplitPlaylistLoading(true);
            setSplitPlaylistError(null);

            const { message: fetchedMessage, snapshotId: fetchedSnapshotId } =
                await playlistsApi.splitPlaylist(
                    spotifyUserId,
                    playlistName,
                    description,
                    songUris,
                );

            setMessage(fetchedMessage);
            setSnapshotId(fetchedSnapshotId);
        } catch (err) {
            setSplitPlaylistError(err as Error);
        } finally {
            setIsSplitPlaylistLoading(false);
        }
    };

    return {
        splitPlaylist,
        message,
        snapshotId,
        isSplitPlaylistLoading,
        setSplitPlaylistError,
        splitPlaylistError,
    };
};
