import { clientId, redirectUri, scopes } from './spotifyConfig';

export const getAuthUrl = () => {
    return `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token&show_dialog=true`;
};

export const getTokenFromUrl = () => {
    if (typeof window === 'undefined') return null;

    const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            if (item) {
                var parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});

    return hash;
};
