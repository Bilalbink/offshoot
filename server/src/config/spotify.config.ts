import "@dotenvx/dotenvx";

export const spotifyConfig = {
    scopes: [
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-private",
        "playlist-modify-public",
        "user-top-read",
    ],
};
