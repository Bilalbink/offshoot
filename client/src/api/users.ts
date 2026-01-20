import { apiClient } from "../services/axios.service";
import type { ApiResponse, SpotifyUserProfile } from "../types";

export const usersApi = {
    getSpotifyProfile: async (): Promise<SpotifyUserProfile> => {
        const response = await apiClient.get<ApiResponse<SpotifyUserProfile>>(
            "/users/spotify-profile",
        );
        return response.data.data;
    },
};
