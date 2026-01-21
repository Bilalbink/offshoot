import { apiClient } from "../services/axios.service";
import type { ApiResponse, SpotifyPlaylist, SpotifyTrack } from "../types";

export const playlistsApi = {
    getUserPlaylists: async (): Promise<SpotifyPlaylist[]> => {
        const response =
            await apiClient.get<ApiResponse<SpotifyPlaylist[]>>("/playlists/");
        return response.data.data;
    },

    getPlaylistTracks: async (
        playlistId: string,
    ): Promise<{
        tracks: SpotifyTrack[];
        availableGenres: string[];
    }> => {
        const response = await apiClient.get<
            ApiResponse<{
                tracks: SpotifyTrack[];
                availableGenres: string[];
            }>
        >(`/playlists/${playlistId}/tracks`);

        return response.data.data;
    },

    splitPlaylist: async (
        spotifyUserId: string,
        playlistName: string,
        description: string,
        songUris: string[],
    ): Promise<{
        message: string;
        snapshotId: string;
    }> => {
        const response = await apiClient.post<
            ApiResponse<{
                message: string;
                snapshotId: string;
            }>
        >(`/playlists/split`, {
            spotifyUserId,
            playlistName,
            description,
            songUris,
        });

        return response.data.data;
    },
};
