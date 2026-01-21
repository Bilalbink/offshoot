import { createAdminClient } from "../config/appwrite.config";
import { logger } from "../utils/logger";
import { Query } from "node-appwrite";
class AppwriteService {
    /**
     * Get user's Spotify access token from Appwrite
     */
    async getSpotifyToken(userId: string): Promise<string> {
        try {
            const { users } = createAdminClient();
            // Get user's OAuth identities
            const identities = await users.listIdentities([
                Query.equal("userId", userId),
            ]);

            logger.info("Fetched user identities", {
                userId,
                count: identities.total,
            });

            // Find Spotify identity
            const spotifyIdentity = identities.identities.find(
                (identity) => identity.provider === "spotify",
            );

            if (!spotifyIdentity) {
                logger.warn("No Spotify identity found for user", { userId });
                throw new Error("No Spotify identity found for user");
            }

            if (!spotifyIdentity.providerAccessToken) {
                throw new Error("No Spotify token found");
            }

            return spotifyIdentity.providerAccessToken;
        } catch (error) {
            logger.error("Failed to get Spotify token", { error, userId });
            throw error;
        }
    }

    /**
     * Get user details from Appwrite
     */
    async getUser(userId: string) {
        try {
            const { users } = createAdminClient();
            return await users.get(userId);
        } catch (error) {
            logger.error("Failed to get user", { error, userId });
            throw error;
        }
    }
}

export default new AppwriteService();
