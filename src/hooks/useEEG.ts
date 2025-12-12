"use client";

import { useState, useCallback, useRef } from "react";

export interface BioState {
    metrics: {
        focus: number; // 0-100 (Derived from consistency)
        calm: number;  // 0-100 (Derived from pace slowness)
        stability: number; // 0-100 (Inverse of jitter)
    };
    state: 'wandering' | 'calm' | 'focused' | 'deep_dhyan';
}

const BUFFER_SIZE = 9; // Last 9 taps (one full Navkar)

export function useTapBiofeedback(mockMode: boolean = false) {
    const [bioState, setBioState] = useState<BioState>({
        metrics: { focus: 0, calm: 0, stability: 0 },
        state: 'wandering',
    });

    const tapHistory = useRef<number[]>([]);

    const registerTap = useCallback(() => {
        if (mockMode) return;

        const now = Date.now();
        tapHistory.current.push(now);

        // Keep buffer strictly limited
        if (tapHistory.current.length > BUFFER_SIZE) {
            tapHistory.current.shift();
        }

        if (tapHistory.current.length < 3) return; // Need at least 3 points for jitter

        // 1. Calculate Intervals
        const intervals: number[] = [];
        for (let i = 1; i < tapHistory.current.length; i++) {
            intervals.push(tapHistory.current[i] - tapHistory.current[i - 1]);
        }

        // 2. Calculate Stats
        const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

        // Standard Deviation (Jitter)
        const variance = intervals.reduce((a, b) => a + Math.pow(b - meanInterval, 2), 0) / intervals.length;
        const stdDev = Math.sqrt(variance);

        // 3. Map to Scores

        // Stability Score (0-100): 
        // < 50ms jitter = 100% stable
        // > 400ms jitter = 0% stable
        const stabilityScore = Math.max(0, Math.min(100, 100 - ((stdDev - 50) / 3.5)));

        // Calm Score (0-100):
        // Imply that slower is calmer (to a point).
        // > 1500ms / tap = 100% calm
        // < 300ms / tap = 0% calm (rushing)
        const calmScore = Math.max(0, Math.min(100, (meanInterval - 300) / 12));

        // Focus is heavily weighted on Stability
        const focusScore = Math.floor(stabilityScore);

        // 4. Determine State
        let newState: BioState['state'] = 'wandering';
        if (focusScore > 60) newState = 'focused';
        if (focusScore > 85 && calmScore > 60) newState = 'deep_dhyan';
        if (focusScore < 60 && calmScore > 70) newState = 'calm'; // Steady but slow?
        // Actually, 'Calm' in UI usually means 'Blue/Cyan'.
        // Let's align with the Aura colors.
        // Gold (Focus) = High Stability.
        // Cyan (Calm) = High Stability + Slow Pace.
        // Indigo (Deep) = Ultra High Stability.

        // Refined Logic:
        if (stdDev > 300) newState = 'wandering'; // Orange
        else if (stdDev < 50) newState = 'deep_dhyan'; // Indigo
        else if (stdDev < 150) newState = 'focused'; // Gold
        else newState = 'calm'; // Cyan (150-300ms jitter)

        setBioState({
            metrics: {
                focus: focusScore,
                calm: Math.floor(calmScore),
                stability: Math.floor(stabilityScore)
            },
            state: newState
        });

    }, [mockMode]);

    return { ...bioState, registerTap };
}
