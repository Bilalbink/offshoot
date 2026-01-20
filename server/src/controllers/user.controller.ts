import { Request, Response, NextFunction } from "express";
import spotifyService from "../services/spotify.service";
import { ApiResponse } from "../types/api-response.types";
import type { SpotifyUserProfile } from "../types/spotify.types";

// TODO: fix import
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
            };
        }
    }
}

export {};

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
            const userId = req.user!.userId;

            const profile = await spotifyService.getUserProfile(userId);

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
