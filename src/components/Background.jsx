import React, { useMemo } from 'react';
import { LINE_BG_COLORS } from '../utils/constants';

const Background = ({ currentTheme, currentLineIndex, brainState }) => {
  // Define Gradient States based on Brain State
  const getGradient = () => {
    switch (brainState) {
      // Gold / Flow (High Energy, High Calm)
      case 'gold':
        return 'radial-gradient(circle at 50% 30%, #fcd34d 0%, #d97706 40%, #78350f 100%)';
      // Cyan / Active (High Focus)
      case 'cyan':
        return 'radial-gradient(circle at 20% 50%, #22d3ee 0%, #0284c7 50%, #0c4a6e 100%)';
      // Indigo / Deep (High Calm)
      case 'indigo':
        return 'radial-gradient(circle at 80% 20%, #818cf8 0%, #4f46e5 50%, #312e81 100%)';
      // Orange / Wandering (Low scores)
      case 'orange':
        return 'radial-gradient(circle at 50% 80%, #fb923c 0%, #ea580c 50%, #7c2d12 100%)';
      // Default / Idle
      default:
        if (currentTheme) return currentTheme.bgGradient;
        const lineBg = LINE_BG_COLORS[currentLineIndex] || LINE_BG_COLORS[0];
        return `linear-gradient(to bottom, ${lineBg}, #000000)`;
    }
  };

  const bgStyle = {
    background: getGradient(),
    opacity: 0.8,
  };

  return (
    <div className="absolute inset-0 -z-10 bg-black overflow-hidden transitio-colors duration-1000">
      {/* Base Layer */}
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
        style={bgStyle}
      />

      {/* Mesh Overlay (Texture) */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Floating Orbs (Subtle Movement) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[120px] animate-bounce duration-[10000ms]" />
    </div>
  );
};

export default Background;
