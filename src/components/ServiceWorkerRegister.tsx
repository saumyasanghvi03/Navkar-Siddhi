'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;

        // Remember whether there was already an active SW before this page load.
        // If yes, any future controllerchange is a real update, not the first install.
        const hadController = !!navigator.serviceWorker.controller;

        // When the new SW takes over, inform the app so it can notify + reload.
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (hadController) {
                window.dispatchEvent(new CustomEvent('swUpdateAvailable'));
            }
        });

        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((registration) => {
                console.log('ServiceWorker registered, scope:', registration.scope);
            }, (err) => {
                console.log('ServiceWorker registration failed:', err);
            });
        });
    }, []);

    return null;
}
