import { z } from "zod";
import { zSpotifyUserProfileSchema } from "../validators/user.validator";
import { zSpotifyUserPlaylistSchema } from "../validators/playlists.validator";
export interface SpotifyError {
    error: string;
    error_description?: string;
}

export type SpotifyUserProfile = z.infer<typeof zSpotifyUserProfileSchema>;
export type SpotifyUserPlaylist = z.infer<typeof zSpotifyUserPlaylistSchema>;
