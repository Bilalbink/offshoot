import { Request, Response, NextFunction } from "express";
import { OAuthProvider } from "node-appwrite";
import { createAdminClient } from "../config/appwrite.config";
import { appwriteConfig } from "../config/appwrite.config";
import { spotifyConfig } from "../config/spotify.config";
import { serverConfig } from "../config/server.config";
import { generateJWT } from "../utils/jwt";
import { logger } from "../utils/logger";

class AuthController {
    /**
     * GET /api/auth/spotify
     * Initiate Spotify OAuth via Appwrite
     */
    async initiateSpotifyLogin(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            logger.info("Initiating Spotify OAuth");

            const { account } = createAdminClient();

            const redirectUrl = await account.createOAuth2Token({
                provider: OAuthProvider.Spotify,
                success: `${serverConfig.backendUrl}/api/auth/callback`,
                failure: `${serverConfig.backendUrl}/api/auth/failure`,
                scopes: spotifyConfig.scopes,
            });

            res.redirect(redirectUrl);
        } catch (error) {
            logger.error("Failed to initiate Spotify login", { error });
            next(error);
        }
    }

    /**
     * GET /api/auth/callback
     * Handle Spotify OAuth callback from Appwrite
     */
    async handleSpotifyCallback(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { userId, secret } = req.query;

            logger.info("OAuth callback received", {
                userId,
                hasSecret: !!secret,
            });

            if (!userId || !secret) {
                logger.error("Missing userId or secret in callback");
                res.redirect(
                    `${serverConfig.frontendUri}/login?error=missing_params`,
                );
                return;
            }

            const { users } = createAdminClient();

            // Get user details
            const user = await users.get(userId as string);
            logger.info("User retrieved from Appwrite", { userId: user.$id });

            // Generate JWT for frontend
            const token = generateJWT({
                userId: user.$id,
                email: user.email,
            });

            // Redirect to frontend with JWT
            res.redirect(
                `${serverConfig.frontendUri}/auth/callback?token=${token}`,
            );
        } catch (error) {
            logger.error("OAuth callback failed", { error });
            res.redirect(
                `${serverConfig.frontendUri}/auth/callback?error=auth_callback_failed`,
            );
        }
    }

    /**
     * POST /api/auth/logout
     * Logout user
     */
    async logout(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            // JWT is stateless, so just tell frontend to delete it
            res.json({ success: true, message: "Logged out successfully" });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
