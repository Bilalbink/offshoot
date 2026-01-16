// External libraries
import axios, { Axios, AxiosError } from "axios";
import querystring from "querystring";

// Config
import { spotifyConfig } from "../config/spotify.config";

// Types
import {
    SpotifyTokenResponse,
    SpotifyAuthUrlResponse,
    SpotifyServiceOerations,
} from "../types/spotify.types";

// Helpers
import { encodeBasicAuth, generateRandomString } from "../utils/helpers";

// Errors
import {
    SpotifyApiError,
    TokenExchangeError,
    TokenRefreshError,
} from "../errors/spotify.errors";

class SpotifyService {
    private readonly SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com";
    private readonly SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

    /**
     * Generates Spotify authorization URL to be used to redirect the user.
     */
    generateAuthUrl(): SpotifyAuthUrlResponse {
        const state = generateRandomString(16);

        const authUrl =
            `${this.SPOTIFY_AUTH_BASE_URL}/authorize?` +
            querystring.stringify({
                response_type: "code",
                client_id: spotifyConfig.clientId,
                scope: spotifyConfig.scopes,
                redirect_uri: spotifyConfig.redirectUri,
                state: state,
            });

        return {
            url: authUrl,
        };
    }

    /**
     * Exchange authorization code for access token
     *
     * @param code - Authorization code from Spotify callback
     * @returns Spotify token response with access and refresh tokens
     * @throws {TokenExchangeError} When token exchange fails
     */
    async exchangeCodeForToken(code: string): Promise<SpotifyTokenResponse> {
        try {
            const response = await axios.post<SpotifyTokenResponse>(
                `${this.SPOTIFY_AUTH_BASE_URL}/api/token/`,
                querystring.stringify({
                    code,
                    redirect_uri: spotifyConfig.redirectUri,
                    grant_type: "authorization_code",
                }),
                {
                    headers: {
                        Authorization: `Basic ${encodeBasicAuth(
                            spotifyConfig.clientId,
                            spotifyConfig.clientSecret
                        )}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            return response.data;
        } catch (error) {
            return this.handleTokenError(error, "exchange");
        }
    }

    async refreshToken(refresh_token: string): Promise<SpotifyTokenResponse> {
        try {
            const response = await axios.post<SpotifyTokenResponse>(
                `${this.SPOTIFY_AUTH_BASE_URL}/api/token/`,
                querystring.stringify({
                    refresh_token,
                    client_id: spotifyConfig.clientId,
                    grant_type: "refresh_token",
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            return response.data;
        } catch (error) {
            return this.handleTokenError(error, "refresh");
        }
    }

    /**
     * Centralized error handler for token operations
     *
     * @param error - The error that occurred
     * @param operation - Type of operation ('exchange' or 'refresh')
     * @throws {TokenExchangeError | TokenRefreshError | SpotifyApiError}
     */
    private handleTokenError(
        error: unknown,
        operation: SpotifyServiceOerations
    ): never {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{
                error: string;
                error_description?: string;
            }>;

            const statusCode = axiosError.response?.status || 500;
            const spotifyError = axiosError.response?.data?.error;
            const errorDescription =
                axiosError.response?.data?.error_description;

            // Map common Spotify errors to user-friendly messages
            const errorMessage = this.mapSpotifyError(
                spotifyError,
                errorDescription,
                operation
            );

            // Throw appropriate error type
            if (operation === "exchange") {
                throw new TokenExchangeError(errorMessage, statusCode, error);
            } else {
                throw new TokenRefreshError(errorMessage, statusCode, error);
            }
        }

        const message =
            error instanceof Error
                ? error.message
                : `Unexpected error during token ${operation}`;

        if (operation === "exchange") {
            throw new TokenExchangeError(message, 500, error);
        } else {
            throw new TokenRefreshError(message, 500, error);
        }
    }

    /**
     * Map Spotify error codes to user-friendly messages
     *
     * @param spotifyError - Error code from Spotify API
     * @param errorDescription - Error description from Spotify API
     * @param operation - Type of operation
     * @returns User-friendly error message
     */
    private mapSpotifyError(
        spotifyError?: string,
        errorDescription?: string,
        operation?: string
    ): string {
        const errorMap: Record<string, string> = {
            invalid_grant:
                "Authorization code is invalid or expired. Please try logging in again.",
            invalid_client:
                "This action cannot be performed at the moment. Please try again later.",
            invalid_request: "Invalid request parameters. Please try again.",
            unauthorized_client:
                "This application is not authorized to use this grant type.",
        };

        if (spotifyError && errorMap[spotifyError]) {
            return errorMap[spotifyError];
        }

        if (errorDescription) {
            return errorDescription;
        }

        return `Failed to ${operation} token. Please try again.`;
    }
}

export default new SpotifyService();
