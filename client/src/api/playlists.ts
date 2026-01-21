import { apiClient } from "../services/axios.service";
import type { ApiResponse, SpotifyPlaylist } from "../types";

export const playlistsApi = {
    getUserPlaylists: async (): Promise<SpotifyPlaylist[]> => {
        const response =
            await apiClient.get<ApiResponse<SpotifyPlaylist[]>>("/playlists/");
        return response.data.data;
    },
};
