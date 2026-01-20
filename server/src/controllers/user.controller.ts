import { Request, Response, NextFunction } from "express";
import spotifyService from "../services/spotify.service";
import { ApiResponse } from "../types/api-response.types";
import type { SpotifyUserProfile } from "../types/spotify.types";

class UserController {
    /**
     * GET /api/users/spotify-profile
     * Get user's Spotify profile
     */
    async getSpotifyProfile(
        req: Request,
        res: Response<ApiResponse<SpotifyUserProfile>>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const profile = await spotifyService.getUserProfile(req.session!);

            res.json({
                success: true,
                data: profile,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
