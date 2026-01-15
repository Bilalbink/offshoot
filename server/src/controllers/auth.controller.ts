// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import spotifyService from "../services/spotifyService";
import {
    SpotifyAuthUrlResponse,
    SpotifyTokenExchangeRequest,
    SpotifyTokenRefreshRequest,
    SpotifyTokenResponse,
} from "../types/spotify.types";

class AuthController {
    /**
     * POST /api/auth/token
     * Exchanges authorization code for access token
     */
    async getAuthUrl(
        req: Request<{}, {}, {}>,
        res: Response<SpotifyAuthUrlResponse>,
        next: NextFunction
    ): Promise<void> {
        try {
            const authUrl = spotifyService.generateAuthUrl();
            res.json(authUrl);
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/auth/token
     * Exchanges authorization code for access token
     */
    async exchangeToken(
        req: Request<{}, {}, SpotifyTokenExchangeRequest>,
        res: Response<SpotifyTokenResponse>,
        next: NextFunction
    ): Promise<void> {
        try {
            const { code } = req.body;

            const token_details = await spotifyService.exchangeCodeForToken(
                code
            );

            res.json(token_details);
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(
        req: Request<{}, {}, SpotifyTokenRefreshRequest>,
        res: Response<SpotifyTokenResponse>,
        next: NextFunction
    ): Promise<void> {
        try {
            const { refresh_token } = req.body;

            const token_details = await spotifyService.refreshToken(
                refresh_token
            );

            res.json(token_details);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
