"use client";

import React from 'react';
import { useNavkar } from './hooks/useNavkar';
import MantraWord from './components/MantraWord';
import ProgressGrid from './components/ProgressGrid';
import MalaRing from './components/MalaRing';
import Dashboard from './components/Dashboard';
import Controls from './components/Controls';
import LiveMetrics from './components/LiveMetrics';
import Aura from './components/Aura';
import AdaptiveAudio from './components/AdaptiveAudio';
import BhaktiModal from './components/BhaktiModal';
import SpotifyWidget from './components/SpotifyWidget';
import { LINE_COLORS } from './utils/constants';

function App() {
  const {
    totalNavkars,
    malaCount,
    navkarsInMala,
    currentIndex,
    currentWord,
    isClearing,
    currentLineIndex,
    currentTheme,
    mode,
    history,
    showDashboard,
    setShowDashboard,
    handleTap,
    toggleMode,
    resetSession,
    resetMala,
    malaSize,
    setMalaSize,
    neuroModeEnabled,
    toggleNeuroMode,
    useMuseEnabled,
    toggleUseMuse,
    isMuseConnected,
    focus,
    calm,
    brainState,
    complexity,
    setComplexityMode,
  } = useNavkar();

  // Lock Mode (No-Distraction)
  const [isLocked, setIsLocked] = React.useState(false);
  const toggleLock = () => setIsLocked(prev => !prev);

  // Soundscape
  const SOUNDSCAPES = ['OM', 'SILENT']; // Removed TEMPLE as per request
  const [activeSoundscape, setActiveSoundscape] = React.useState('OM');
  const cycleSoundscape = () => {
    setActiveSoundscape(prev => {
      const idx = SOUNDSCAPES.indexOf(prev);
      return SOUNDSCAPES[(idx + 1) % SOUNDSCAPES.length];
    });
  };

  // Bhakti Mode
  const [showBhakti, setShowBhakti] = React.useState(false);

  // Use LINE_COLORS for line‑based background colors
  const lineBackgroundColors = LINE_COLORS;



  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      {/* Dynamic Background: Line-based colors with Theme priority */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: '#FDFBF7', // Fixed cream light color
        }}
      />

      {/* Header Stats – solid teal background (Hidden in Lock Mode) */}
      {!isLocked && (
        <div className="fixed top-8 left-4 z-20 flex flex-col items-start gap-2">
          {/* ... Header Content ... */}
          <div className="flex items-center gap-4 px-4 py-2 bg-teal-600 rounded-full shadow-lg text-white font-serif">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest opacity-60">Navkar</span>
              <span className="text-xl font-bold font-headline">{totalNavkars}</span>
            </div>
            <div className="w-px h-8 bg-white/20 mx-2" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest opacity-60">Mala</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold font-headline">{malaCount}</span>
                <span className="text-xs opacity-50">.{navkarsInMala}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Music Widget (Hidden in Lock Mode) */}
      {!isLocked && <SpotifyWidget onOpenBhakti={() => setShowBhakti(true)} />}

      {/* Controls (Hidden in Lock Mode) */}
      {!isLocked && (
        <Controls
          mode={mode}
          toggleMode={toggleMode}
          onOpenDashboard={() => setShowDashboard(true)}
          neuroModeEnabled={neuroModeEnabled}
          toggleNeuroMode={toggleNeuroMode}
          useMuseEnabled={useMuseEnabled}
          toggleUseMuse={toggleUseMuse}
          isMuseConnected={isMuseConnected}
          malaSize={malaSize}
          setMalaSize={setMalaSize}
          onReset={resetSession}
          onResetMala={resetMala}
          complexity={complexity}
          setComplexityMode={setComplexityMode}
          isLocked={isLocked}
          toggleLock={toggleLock}
          activeSoundscape={activeSoundscape}
          cycleSoundscape={cycleSoundscape}
          onOpenBhakti={() => setShowBhakti(true)}
        />
      )}

      {/* Main Interaction Layer */}
      <div
        onClick={handleTap}
        className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 touch-manipulation"
        style={{ paddingBottom: mode === 'GRID' ? '15vh' : '0' }}
      >
        {/* Ring Mode */}
        {mode === 'RING' && (
          <MalaRing
            totalNavkars={totalNavkars}
            currentTheme={currentTheme}
            malaSize={malaSize}
          />
        )}

        {/* Word */}
        <div className="relative z-20 flex items-center justify-center">
          {currentIndex === -1 && !isClearing && (
            <span
              className="text-lg sm:text-xl tracking-[0.2em] font-serif uppercase animate-pulse select-none"
              style={{ color: LINE_COLORS[totalNavkars % LINE_COLORS.length] }}
            >
              Tap to Begin
            </span>
          )}
          {currentIndex >= 0 && !isClearing && (
            <>
              {complexity !== 'BASIC' && (
                <Aura enabled={neuroModeEnabled} state={brainState} size={1.2} />
              )}
              <MantraWord word={currentWord} lineIndex={currentLineIndex} />
            </>
          )}
        </div>
      </div>

      {/* Grid Mode Footer */}
      {mode === 'GRID' && (
        <ProgressGrid totalNavkars={totalNavkars} currentTheme={currentTheme} />
      )}

      {/* Live Metrics – visible when neuro mode enabled */}
      {neuroModeEnabled && (
        <LiveMetrics focus={focus} calm={calm} brainState={brainState} />
      )}

      {/* Adaptive Audio – always active when neuro mode enabled */}
      <AdaptiveAudio enabled={neuroModeEnabled} brainState={brainState} soundscape={activeSoundscape} />

      {/* Unlock Overlay */}
      {isLocked && (
        <div className="fixed bottom-8 left-4 z-50">
          <button
            onClick={toggleLock}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 text-teal-800/60 backdrop-blur-sm border border-white/30 hover:bg-white/40 transition-all"
            title="Unlock Controls"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>
        </div>
      )}

      {/* Dashboard Overlay */}
      {showDashboard && (
        <Dashboard
          history={history}
          totalNavkars={totalNavkars}
          onClose={() => setShowDashboard(false)}
        />
      )}

      {/* Bhakti Modal */}
      {showBhakti && (
        <BhaktiModal onClose={() => setShowBhakti(false)} />
      )}
    </div>
  );
}

export default App;
