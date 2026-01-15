import '@dotenvx/dotenvx';

export const spotifyConfig = {
    clientId: process.env.SPOTIFY_CLIENT_ID!,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI!,
    frontendUri: process.env.FRONTEND_URI,
    scopes: [
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-private',
        'playlist-modify-public',
        'user-top-read'
    ].join(' ')
}