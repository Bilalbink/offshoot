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
