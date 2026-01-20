import { createSessionClient } from "../config/appwrite.config";

class AppwriteService {
    /**
     * Get user's Spotify access token from Appwrite
     */
    async getSpotifyToken(session: string): Promise<string | null> {
        try {
            const { account } = createSessionClient(session);

            // Get user's OAuth identities
            const identities = await account.listIdentities();

            // Find Spotify identity
            const spotifyIdentity = identities.identities.find(
                (identity) => identity.provider === "spotify",
            );

            if (!spotifyIdentity) {
                return null;
            }

            // Extract access token
            const accessToken = spotifyIdentity.providerAccessToken;

            return accessToken;
        } catch (error) {
            throw error;
        }
    }
}

export default new AppwriteService();
