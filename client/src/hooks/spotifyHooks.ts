import { useState, useEffect } from "react";
import { usersApi } from "../api/users";
import { playlistsApi } from "../api/playlists";
import type { SpotifyPlaylist, SpotifyUserProfile } from "../types";

export const useSpotifyProfile = () => {
    const [data, setData] = useState<SpotifyUserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                const profile = await usersApi.getSpotifyProfile();
                setData(profile);
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { data, isLoading, error };
};

export const useSpotifyPlaylists = () => {
    const [data, setData] = useState<SpotifyPlaylist[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                setIsLoading(true);
                const allPlaylists = await playlistsApi.getUserPlaylists();
                setData(allPlaylists);
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    return { data, isLoading, error };
};
