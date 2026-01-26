import React, { useState, useEffect } from 'react';
import MantraWord from './MantraWord';

const MANTRA_WORDS = [
  "Namo", "Arihantanam",
  "Namo", "Siddhanam",
  "Namo", "Ayariyanam",
  "Namo", "Uvajjhayanam",
  "Namo", "Loye", "Savva", "Sahunam",
  "Eso", "Pancha", "Namukkaro",
  "Savva", "Pavappanasano",
  "Mangalanam", "Cha", "Savvesim",
  "Padhamam", "Havai", "Mangalam"
];

const WritingArea = ({ totalCount, setTotalCount }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isClearing, setIsClearing] = useState(false);

  const handleTap = () => {
    // If we are in the clearing phase (waiting 1 second), ignore taps
    if (isClearing) return;

    // Vibrate on tap
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex < MANTRA_WORDS.length) {
      // Just show the next word
      setCurrentIndex(nextIndex);

      // Check if it's the last word ("Mangalam")
      if (nextIndex === MANTRA_WORDS.length - 1) {
        handleMantraCompletion();
      }
    } else {
      // Logic for restarting happens after the clearing phase,
      // but essentially the first tap after clear resets index to 0.
      // Wait, if currentIndex is -1 (initial or reset state), nextIndex is 0.
      // So this block handles if we somehow tap past the end, which shouldn't happen
      // because we reset to -1.
      if (currentIndex === MANTRA_WORDS.length - 1) {
         // Should not reach here if handleMantraCompletion works correctly
      }
    }
  };

  const handleMantraCompletion = () => {
    // Vibrate longer for completion
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    // Increment count
    const newCount = totalCount + 1;
    setTotalCount(newCount);
    localStorage.setItem('totalCount', newCount.toString());

    // Wait 1 second then clear
    setIsClearing(true);
    setTimeout(() => {
      setCurrentIndex(-1); // Reset to blank
      setIsClearing(false);
    }, 1000);
  };

  return (
    <div
      onClick={handleTap}
      className="absolute inset-0 flex items-center justify-center cursor-pointer z-0 touch-manipulation"
      style={{ paddingBottom: '15vh' }} // Leave space for grid
    >
      {currentIndex >= 0 && currentIndex < MANTRA_WORDS.length && (
        <MantraWord word={MANTRA_WORDS[currentIndex]} />
      )}
      {/*
        Optional: A hint for the very first time interaction if needed.
        But instructions were "Write word-by-word", minimal.
        So empty screen at start is correct.
      */}
    </div>
  );
};

export default WritingArea;
