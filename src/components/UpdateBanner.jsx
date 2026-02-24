import React, { useState, useEffect, useRef } from 'react';

/**
 * UpdateBanner — shown automatically when a new version of the app is deployed.
 * Listens for the `swUpdateAvailable` custom event dispatched by ServiceWorkerRegister.
 * When the user clicks "Refresh Now", the waiting service worker is told to skip waiting
 * and the page reloads to load the latest version.
 */
const UpdateBanner = () => {
  const [visible, setVisible] = useState(false);
  const workerRef = useRef(null);

  useEffect(() => {
    const handleUpdate = (event) => {
      workerRef.current = event.detail?.worker || null;
      setVisible(true);
    };

    window.addEventListener('swUpdateAvailable', handleUpdate);
    return () => window.removeEventListener('swUpdateAvailable', handleUpdate);
  }, []);

  const handleRefresh = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'SKIP_WAITING' });
    }
    // Reload once the new SW has taken control (fire once, no duplicates)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    }, { once: true });
  };

  const handleDismiss = () => setVisible(false);

  if (!visible) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[200] px-4 pb-4 pt-2 pointer-events-none"
    >
      <div className="max-w-lg mx-auto pointer-events-auto">
        <div className="bg-white border border-orange-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400" />

          <div className="px-4 py-3 flex items-start gap-3">
            {/* Icon */}
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 leading-snug">
                ✨ New update available!
              </p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                A fresh version of Navkar Siddhi is ready. Refresh to get the latest features and fixes.
              </p>
            </div>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1 -mr-1"
              aria-label="Dismiss update notification"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Action */}
          <div className="px-4 pb-3">
            <button
              onClick={handleRefresh}
              className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-sm"
            >
              Refresh Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBanner;
