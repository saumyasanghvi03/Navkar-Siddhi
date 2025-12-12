import React, { useState, useEffect } from 'react';
import { getAuthUrl, getTokenFromUrl } from '../lib/spotifyAuth';

// NOTE: Real implementation requires Spotify Web API SDK and implicit grant flow or backend token exchange.
// This is a UI layer that simulates the connection and display.

const SpotifyWidget = () => {
    const [token, setToken] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isIdle, setIsIdle] = useState(false);

    // 1. Check for token in URL hash or LocalStorage on mount
    useEffect(() => {
        const hash = getTokenFromUrl();
        window.location.hash = ''; // Clear hash for clean URL

        const _token = hash.access_token || localStorage.getItem('spotify_token');

        if (_token) {
            setToken(_token);
            localStorage.setItem('spotify_token', _token);
        }
    }, []);

    // 2. Poll Spotify API for "Currently Playing"
    useEffect(() => {
        if (!token) return;

        const fetchTrack = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 204 || response.status > 400) {
                    setIsIdle(true);
                    setCurrentTrack(null); // Clear track if nothing is playing or error
                    return;
                }

                const data = await response.json();
                if (data && data.item) {
                    setIsIdle(false);
                    setCurrentTrack({
                        name: data.item.name,
                        artist: data.item.artists.map(a => a.name).join(', '),
                        isPlaying: data.is_playing
                    });
                } else {
                    setIsIdle(true);
                    setCurrentTrack(null); // Clear track if nothing is playing or error
                }
            } catch (error) {
                console.error("Spotify Fetch Error", error);
                // If token invalid (401), clear it
                // localStorage.removeItem('spotify_token');
                // setToken(null);
            }
        };

        fetchTrack();
        const interval = setInterval(fetchTrack, 5000); // Poll every 5s

        return () => clearInterval(interval);
    }, [token]);

    const handleConnect = () => {
        // Redirect to Spotify Auth
        window.location.href = getAuthUrl();
    };

    const handleDisconnect = () => {
        setToken(null);
        localStorage.removeItem('spotify_token');
        setCurrentTrack(null);
        setIsIdle(false); // Reset idle state
    };

    // State: Not Connected
    if (!token) {
        return (
            <div className="fixed top-8 right-4 z-20">
                <button
                    onClick={handleConnect}
                    className="flex items-center gap-2 bg-black/80 hover:bg-green-600 text-white px-3 py-1.5 rounded-full backdrop-blur-md transition-all text-xs font-medium border border-white/10"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.96 1.74.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.24z" />
                    </svg>
                    <span>Connect Spotify</span>
                </button>
            </div>
        );
    }

    // State: Connected but Idle (Not playing)
    if (isIdle || !currentTrack) {
        return (
            <div className="fixed top-8 right-4 z-20">
                <button
                    onClick={handleDisconnect}
                    className="flex items-center gap-2 bg-black/60 text-white/50 px-3 py-1.5 rounded-full backdrop-blur-md text-[10px] hover:bg-black/80 hover:text-white"
                >
                    <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                    Spotify Idle
                </button>
            </div>
        );
    }

    // State: Playing
    return (
        <div className="fixed top-8 right-4 z-20 flex items-center gap-2 animate-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg group">
                <div className="relative w-4 h-4 flex items-center justify-center">
                    <svg className={`w-4 h-4 text-green-500 ${currentTrack.isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.96 1.74.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.24z" />
                    </svg>
                </div>
                <div className="flex flex-col items-start min-w-[100px] max-w-[180px]">
                    <span className="text-white text-[10px] font-bold truncate w-full leading-tight">
                        {currentTrack.name}
                    </span>
                    <span className="text-white/60 text-[9px] truncate w-full leading-tight">
                        {currentTrack.artist}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SpotifyWidget;
