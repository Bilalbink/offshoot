// External libraries
import axios, { AxiosRequestConfig, Method, AxiosError } from "axios";

// Services
import appwriteService from "./appwrite.service";

// Types
import {
    SpotifyUserProfile,
    SpotifyUserPlaylist,
} from "../types/spotify.types";

// Errors
import { SpotifyApiError } from "../errors/spotify.errors";

// Utils
import { logger } from "../utils/logger";

class SpotifyService {
    private readonly SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
    private readonly RETRY_DELAY = 1000;
    private readonly MAX_RETRIES = 3;

    /**
     * Make a request to Spotify API with automatic retry handling
     * @param method - HTTP method (GET, POST, PUT, DELETE, PATCH)
     * @param url - Relative URL path (e.g., '/me/playlists')
     * @param token - Spotify access token for authorization
     * @param data - Optional request data (query params for GET, body for other methods)
     * @returns Promise with the response data
     * @throws Error if request fails after all retries
     */
    private async makeSpotifyRequest<T>(
        method: Method,
        url: string,
        token: string,
        data?: any,
        retryCount = 0,
    ): Promise<T> {
        try {
            const config: AxiosRequestConfig = {
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            if (data) {
                config.data = data;
            }

            const response = await axios(config);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            // Rate limit handling (429)
            if (axiosError.response?.status === 429) {
                const retryAfter = axiosError.response.headers["retry-after"];
                const delayMs = retryAfter
                    ? parseInt(retryAfter) * 1000
                    : this.RETRY_DELAY * Math.pow(2, retryCount);

                logger.warn("Rate limited by Spotify API", {
                    method,
                    url,
                    retryAfter: delayMs,
                    attempt: retryCount + 1,
                });

                if (retryCount < this.MAX_RETRIES) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, delayMs),
                    );

                    return this.makeSpotifyRequest<T>(
                        method,
                        url,
                        token,
                        data,
                        retryCount + 1,
                    );
                }
            }

            const statusCode = axiosError.response?.status || 500;
            const errorData = axiosError.response?.data || {
                error: "Unknown Spotify API error",
            };

            throw new SpotifyApiError(
                JSON.stringify(errorData),
                statusCode,
                error,
            );
        }
    }

    async getUserProfile(session: string): Promise<SpotifyUserProfile> {
        try {
            const spotifyToken = await appwriteService.getSpotifyToken(session);

            const profile = await this.makeSpotifyRequest<SpotifyUserProfile>(
                "GET",
                `${this.SPOTIFY_API_BASE_URL}/me`,
                spotifyToken,
            );

            return profile;
        } catch (error) {
            throw error;
        }
    }

    async getUserPlaylists(session: string): Promise<SpotifyUserPlaylist[]> {
        try {
            const spotifyToken = await appwriteService.getSpotifyToken(session);
            let allPlaylists: SpotifyUserPlaylist[] = [];
            let url = `${this.SPOTIFY_API_BASE_URL}/me/playlists?limit=50`;

            while (url) {
                const response = await this.makeSpotifyRequest<{
                    items: any[];
                    next: string | null;
                }>("GET", url, spotifyToken);

                allPlaylists = allPlaylists.concat(response.items);
                url = response.next || "";
            }

            return allPlaylists;
        } catch (error) {
            throw error;
        }
    }
}

export default new SpotifyService();
