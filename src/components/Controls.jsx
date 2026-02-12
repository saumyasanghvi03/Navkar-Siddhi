import React from 'react';

const Controls = ({
  mode,
  toggleMode,
  onOpenDashboard,
  neuroModeEnabled,
  toggleNeuroMode,
  useMuseEnabled,
  toggleUseMuse,
  isMuseConnected,
  malaSize,
  setMalaSize,
  onReset,
  onResetMala,
  isLocked,
  toggleLock,
  activeSoundscape,
  cycleSoundscape,
  onOpenBhakti,
}) => {
  return (
    <div className="fixed bottom-4 left-2 right-2 sm:left-4 sm:right-auto sm:bottom-8 z-40 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
      {/* Mala Size */}
      <div className="flex bg-indigo-600 rounded-full p-1 gap-1">
        {[9, 27, 108].map(size => (
          <button
            key={size}
            onClick={() => setMalaSize(size)}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${malaSize === size ? 'bg-white text-indigo-800' : 'text-white'}`}
            title={`${size} beads`}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="hidden sm:block w-px h-6 bg-indigo-400 mx-1" />

      {/* Mode Toggle */}
      <button
        onClick={toggleMode}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-500"
        title={mode === 'GRID' ? 'View Ring' : 'View Grid'}
      >
        {mode === 'GRID' ? '🕸️' : '🔘'}
      </button>

      <div className="hidden sm:block w-px h-6 bg-indigo-400 mx-1" />

      {/* Neuro Mode */}
      <button
        onClick={toggleNeuroMode}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${neuroModeEnabled ? 'bg-indigo-200 text-indigo-800' : 'bg-indigo-600 text-white'}`}
        title="Neural Interface"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>

      <div className="hidden sm:block w-px h-6 bg-indigo-400 mx-1" />

      {/* Muse */}
      <button
        onClick={toggleUseMuse}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${useMuseEnabled ? (isMuseConnected ? 'bg-purple-200 text-purple-800' : 'bg-amber-200 text-amber-800 animate-pulse') : 'bg-indigo-600 text-white'}`}
        title={isMuseConnected ? 'Muse Linked' : 'Connect Muse'}
      >
        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      </button>

      <div className="hidden sm:block w-px h-6 bg-indigo-400 mx-1" />

      {/* Dashboard */}
      <button
        onClick={onOpenDashboard}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-500"
        title="Journey stats"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      <div className="hidden sm:block w-px h-6 bg-indigo-400 mx-1" />

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-red-600 text-white hover:bg-red-500"
        title="Reset Session"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Mala Reset */}
      <button
        onClick={onResetMala}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-orange-500 text-white hover:bg-orange-400"
        title="Reset Current Mala"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          <circle cx="12" cy="12" r="3" strokeWidth={2} />
        </svg>
      </button>
      <div className="hidden sm:block w-px h-6 bg-indigo-400 mx-1" />

      {/* Lock Mode */}
      <button
        onClick={toggleLock}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-500"
        title="Lock Mode (Focus)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </button>

      <div className="hidden sm:block w-px h-6 bg-indigo-400 mx-1" />

      {/* Soundscape */}
      <button
        onClick={cycleSoundscape}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-500 font-bold text-xs"
        title={`Soundscape: ${activeSoundscape}`}
      >
        {activeSoundscape === 'OM' ? '🕉️' : '🔇'}
      </button>

      <div className="hidden sm:block w-px h-6 bg-indigo-400 mx-1" />

      {/* Bhakti Mode */}
      <button
        onClick={onOpenBhakti}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-500"
        title="Bhakti Mode (Stotras)"
      >
        🙏
      </button>
    </div>
  );
};

export default Controls;
