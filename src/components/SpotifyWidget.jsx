import React from 'react';

const SpotifyWidget = ({ onOpenBhakti }) => {
    return (
        <div className="fixed top-8 right-4 z-20">
            <button
                onClick={onOpenBhakti}
                className="flex items-center gap-2 bg-amber-600/90 hover:bg-amber-500 text-white px-3 py-1.5 rounded-full backdrop-blur-md transition-all text-xs font-medium border border-white/10 shadow-lg"
                title="Bhakti Music"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span>Bhakti Music</span>
            </button>
        </div>
    );
};

export default SpotifyWidget;
