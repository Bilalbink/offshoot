// External libraries
import axios from "axios";

// Services
import appwriteService from "./appwrite.service";

// Types
import { SpotifyUserProfile } from "../types/spotify.types";

// Errors
import { SpotifyApiError } from "../errors/spotify.errors";

class SpotifyService {
    private readonly SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

    /**
     * Get Spotify user profile
     */
    async getUserProfile(session: string): Promise<SpotifyUserProfile> {
        try {
            // Get Spotify token from Appwrite
            const spotifyToken = await appwriteService.getSpotifyToken(session);

            if (!spotifyToken) {
                throw new Error("No Spotify token found");
            }

            // Call Spotify API
            const response = await axios.get(
                `${this.SPOTIFY_API_BASE_URL}/me`,
                {
                    headers: {
                        Authorization: `Bearer ${spotifyToken}`,
                    },
                },
            );

            return response.data;
        } catch (error) {
            return this.handleTokenError(error);
        }
    }

    /**
     * Centralized error handler for token operations
     *
     * @param error - The error that occurred
     * @throws {SpotifyApiError | Error}
     */
    private handleTokenError(error: unknown): never {
        if (axios.isAxiosError(error)) {
            // Return Spotify API error response as-is
            const statusCode = error.response?.status || 500;
            const errorData = error.response?.data || {
                error: "Unknown Spotify API error",
            };

            throw new SpotifyApiError(
                JSON.stringify(errorData),
                statusCode,
                error,
            );
        }

        // Generic error
        const message =
            error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(message);
    }
}

export default new SpotifyService();
