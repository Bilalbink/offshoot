import { z } from "zod";

const playlistImageSchema = z.object({
    url: z.url(),
    height: z.number().nullable(),
    width: z.number().nullable(),
});

const externalUrlsSchema = z.object({
    spotify: z.url(),
});

const playlistOwnerSchema = z.object({
    external_urls: externalUrlsSchema,
    href: z.url(),
    id: z.string(),
    type: z.literal("user"),
    uri: z.string(),
    display_name: z.string(),
});

const playlistTracksSchema = z.object({
    href: z.url(),
    total: z.number(),
});

export const zSpotifyUserPlaylistSchema = z.object({
    collaborative: z.boolean(),
    description: z.string(),
    external_urls: externalUrlsSchema,
    href: z.url(),
    id: z.string(),
    images: z.array(playlistImageSchema),
    name: z.string(),
    owner: playlistOwnerSchema,
    public: z.boolean(),
    snapshot_id: z.string(),
    tracks: playlistTracksSchema,
    type: z.literal("playlist"),
    uri: z.string(),
    primary_color: z.string().nullable(),
});

export const zSpotifyTrackSchema = z.object({
    track: z.object({
        id: z.string(),
        name: z.string(),
        album: z.object({
            name: z.string(),
            images: z.array(
                z.object({
                    url: z.url(),
                    width: z.number(),
                    height: z.number(),
                }),
            ),
        }),
        artists: z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                genres: z.array(z.string()).optional(),
            }),
        ),
    }),
});

export const zSpotifyArtistSchema = z.object({
    external_urls: z.object({
        spotify: z.url(),
    }),
    followers: z.object({
        href: z.string().nullable(),
        total: z.number(),
    }),
    genres: z.array(z.string()),
    href: z.url(),
    id: z.string(),
    images: z.array(
        z.object({
            url: z.url(),
            height: z.number().nullable(),
            width: z.number().nullable(),
        }),
    ),
    name: z.string(),
    popularity: z.number(),
    type: z.literal("artist"),
    uri: z.string(),
});

export const zSplitPlaylistRequestSchema = z.object({
    spotifyUserId: z.string(),
    playlistName: z.string(),
    description: z.string(),
    songUris: z.array(z.string()),
});
