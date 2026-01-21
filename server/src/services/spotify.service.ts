// External libraries
import axios, { AxiosRequestConfig, Method, AxiosError } from "axios";

// Services
import appwriteService from "./appwrite.service";

// Types
import {
    SpotifyTrack,
    SpotifyArtist,
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
        params?: any,
        retryCount = 0,
    ): Promise<T> {
        try {
            const config: AxiosRequestConfig = {
                method,
                url,
                params,
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

    async getUserProfile(userId: string): Promise<SpotifyUserProfile> {
        try {
            const spotifyToken = await appwriteService.getSpotifyToken(userId);

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

    async getUserPlaylists(userId: string): Promise<SpotifyUserPlaylist[]> {
        try {
            const spotifyToken = await appwriteService.getSpotifyToken(userId);
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

    async getPlaylistTracks(
        userId: string,
        playlistId: string,
    ): Promise<SpotifyTrack[]> {
        try {
            const spotifyToken = await appwriteService.getSpotifyToken(userId);
            let allTracks: SpotifyTrack[] = [];
            let url = `${this.SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`;
            let params = {
                limit: 50,
                fields: "next,items(track(id,name,album(name,images),artists(id,name))",
            };

            while (url) {
                const response = await this.makeSpotifyRequest<{
                    items: any[];
                    next: string | null;
                }>("GET", url, spotifyToken, null, params);

                allTracks = allTracks.concat(response.items);
                url = response.next || "";
            }

            return allTracks;
        } catch (error) {
            throw error;
        }
    }

    async getArtists(
        userId: string,
        artistIds: string[],
    ): Promise<SpotifyArtist[]> {
        try {
            const spotifyToken = await appwriteService.getSpotifyToken(userId);
            const uniqueArtistIds = [...new Set(artistIds)];
            let allArtists: SpotifyArtist[] = [];

            // Process in chunks of 50 (Spotify's limit)
            for (let i = 0; i < uniqueArtistIds.length; i += 50) {
                const chunk = uniqueArtistIds.slice(i, i + 50);
                const ids = chunk.join(",");

                const response = await this.makeSpotifyRequest<{
                    artists: any[];
                }>(
                    "GET",
                    `${this.SPOTIFY_API_BASE_URL}/artists?ids=${ids}`,
                    spotifyToken,
                );

                allArtists = allArtists.concat(response.artists);

                // Short delay
                if (i + 50 < uniqueArtistIds.length) {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
            }

            return allArtists;
        } catch (error) {
            throw error;
        }
    }

    /**
     * The Genres of a track are not present by default, instead they must be extracted by getting the
     * details of the artists which contains the genres associated with the artist.
     * // TODO: Since an artist can have a wide range of genres, genres added to the track may not be accurate.
     *          Need to find a more accurate solution.
     * @param userId Spotify user Id
     * @param playlistId Id of the playlist
     */
    async getPlaylistTracksWithGenre(
        userId: string,
        playlistId: string,
    ): Promise<{
        tracks: SpotifyTrack[];
        availableGenres: string[];
    }> {
        try {
            const tracks = await this.getPlaylistTracks(userId, playlistId);

            const artistIds: string[] = [];
            tracks.forEach((item) => {
                if (item.track?.artists) {
                    item.track.artists.forEach((artist: any) => {
                        artistIds.push(artist.id);
                    });
                }
            });

            logger.info("length of artist: " + artistIds.length);

            const allArtists = await this.getArtists(userId, artistIds);

            // Artist map for quick lookup
            const artistMap = new Map(
                allArtists.map((artist) => [artist.id, artist]),
            );

            const enrichedTracks = tracks.map((item) => ({
                ...item,
                track: {
                    ...item.track,
                    artists: item.track?.artists?.map((artist: any) => ({
                        ...artist,
                        genres: artistMap.get(artist.id)?.genres || [],
                    })),
                },
            }));

            const allGenres = new Set<string>();
            allArtists.forEach((artist) => {
                artist.genres?.forEach((genre: string) => {
                    allGenres.add(genre);
                });
            });

            logger.info("Successfully enriched playlist with genres", {
                playlistId,
                tracks: enrichedTracks.length,
                uniqueGenres: allGenres.size,
            });

            return {
                tracks: enrichedTracks,
                availableGenres: Array.from(allGenres).sort(),
            };
        } catch (error) {
            throw error;
        }
    }
}

export default new SpotifyService();
