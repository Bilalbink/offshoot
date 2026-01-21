import { Request, Response, NextFunction } from "express";
import spotifyService from "../services/spotify.service";
import { ApiResponse } from "../types/api-response.types";
import type { SpotifyUserPlaylist, SpotifyTrack } from "../types/spotify.types";

class PlaylistController {
    /**
     * GET /api/playlists
     * Get user's Spotify playlists
     */
    async getUserPlaylists(
        req: Request,
        res: Response<ApiResponse<SpotifyUserPlaylist[]>>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const userId = req.user!.userId;

            const allPlaylists = await spotifyService.getUserPlaylists(userId);

            res.json({
                success: true,
                data: allPlaylists,
            });
        } catch (error) {
            next(error);
        }
    }

    async getPlaylistTrackWithGenre(
        req: Request,
        res: Response<
            ApiResponse<{
                tracks: SpotifyTrack[];
                availableGenres: string[];
            }>
        >,
        next: NextFunction,
    ): Promise<void> {
        try {
            const userId = req.user!.userId;
            const { playlistId } = req.params;

            const { tracks, availableGenres } =
                await spotifyService.getPlaylistTracksWithGenre(
                    userId,
                    playlistId,
                );

            res.json({
                success: true,
                data: {
                    tracks,
                    availableGenres,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new PlaylistController();
