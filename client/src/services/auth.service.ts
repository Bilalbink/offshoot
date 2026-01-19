import { Client, Account, OAuthProvider } from "appwrite";
import { spotifyConfig } from "../config/spotify.config";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);

const account = new Account(client);

class AuthService {
    /**
     * Login with Spotify via Appwrite
     */
    loginWithSpotify() {
        account.createOAuth2Session({
            provider: OAuthProvider.Spotify,
            success: `${window.location.origin}/auth/callback`,
            failure: `${window.location.origin}/auth/failure`,
            scopes: spotifyConfig.scopes,
        });
    }

    /**
     * Get current session
     */
    async getCurrentSession() {
        try {
            const session = await account.getSession({ sessionId: "current" });
            return session;
        } catch (error) {
            return null;
        }
    }

    /**
     * Get session token (for API calls)
     */
    async getSessionToken() {
        try {
            const session = await this.getCurrentSession();
            return session?.$id || null;
        } catch (error) {
            return null;
        }
    }

    /**
     * Logout
     */
    async logout() {
        try {
            await account.deleteSession({ sessionId: "current" });
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    /**
     * Get current user
     */
    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    }
}

export default new AuthService();
