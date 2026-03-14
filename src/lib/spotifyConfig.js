// Replace with your Spotify Client ID from https://developer.spotify.com/dashboard
export const clientId = 'YOUR_SPOTIFY_CLIENT_ID_HERE';
export const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/callback` : 'http://localhost:3000/callback';
export const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state',
];
