'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;

        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').then(function (registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);

                const notifyUpdate = (worker: ServiceWorker) => {
                    window.dispatchEvent(
                        new CustomEvent('swUpdateAvailable', { detail: { worker } })
                    );
                };

                // A new SW is already waiting (page was refreshed while update was pending)
                if (registration.waiting) {
                    notifyUpdate(registration.waiting);
                    return;
                }

                // Listen for a new SW found during this session
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (!newWorker) return;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            notifyUpdate(newWorker);
                        }
                    });
                });
            }, function (err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }, []);

    return null;
}
