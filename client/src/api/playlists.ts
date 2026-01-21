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
};
