"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CallbackPage() {
    const router = useRouter();

    useEffect(() => {
        // Determine where to save the token (usually local storage) and then redirect
        // The simplified SpotifyAuth logic reads from hash on any page load, 
        // but a cleaner flow is to parse it here.

        // We'll let the existing widget logic handle the parsing by redirecting to home with the hash intact
        // or we can parse it here and clean the URL.
        // Let's rely on the existing widget logic which looks for hash on mount.
        // So we just push to root, BUT must ensure hash is preserved or processed.

        if (window.location.hash) {
            // If we have a hash, the widget on the home page will read it.
            // So we redirect to home with the hash.
            router.push('/' + window.location.hash);
        } else {
            router.push('/');
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
            <div className="animate-pulse">Connecting to Spotify...</div>
        </div>
    );
}
