// src/hooks/useTapBiofeedback.ts

/**
 * Hook to capture tap rhythm and derive a simple biofeedback score.
 *
 * It records timestamps of tap events (e.g., from a button click or touch).
 * From the inter‑tap intervals it computes an average interval and maps it to a
 * score between 0 and 100 where faster, more regular tapping yields a higher
 * score (interpreted as higher focus). The hook also provides a `reset`
 * function to clear the recorded taps.
 */
import { useState, useCallback, useRef } from "react";

/**
 * Configuration for the biofeedback algorithm.
 */
interface TapBiofeedbackConfig {
    /** Minimum interval (ms) that maps to score 0 */
    minInterval?: number;
    /** Maximum interval (ms) that maps to score 100 */
    maxInterval?: number;
    /** Number of taps required before a score is emitted */
    requiredTaps?: number;
}

/**
 * Result returned by the hook.
 */
export interface TapBiofeedbackResult {
    /** Current biofeedback score (0‑100) */
    /** Current calm score (0‑100) based on rhythm stability */
    calm: number;
    /** Whether the current score exceeds a focus threshold */
    isFocused: boolean;
    /** Function to be called on each tap event */
    onTap: () => void;
    /** Reset all recorded taps */
    reset: () => void;
}

/**
 * Default configuration – tuned for typical human tapping speeds.
 */
const DEFAULT_CONFIG: Required<TapBiofeedbackConfig> = {
    minInterval: 400, // 0.4s (Fast Chanting) -> Max Focus
    maxInterval: 2500, // 2.5s (Slow/Deep Chanting) -> Min Score (still allows scoring)
    requiredTaps: 3, // Faster startup
};

/**
 * Linear mapping from interval to score.
 */
function intervalToScore(interval: number, cfg: Required<TapBiofeedbackConfig>): number {
    const { minInterval, maxInterval } = cfg;
    if (interval <= minInterval) return 100;
    if (interval >= maxInterval) return 0;
    // Linear interpolation
    const ratio = (maxInterval - interval) / (maxInterval - minInterval);
    return Math.round(ratio * 100);
}

/**
 * Hook implementation.
 */
export function useTapBiofeedback(
    config?: TapBiofeedbackConfig,
    focusThreshold: number = 70
): TapBiofeedbackResult {
    const cfg = { ...DEFAULT_CONFIG, ...config } as Required<TapBiofeedbackConfig>;
    const [score, setScore] = useState(0);
    const [calm, setCalm] = useState(0);
    const tapsRef = useRef<number[]>([]);

    const computeScore = useCallback(() => {
        const taps = tapsRef.current;
        if (taps.length < cfg.requiredTaps) {
            setScore(0);
            setCalm(0);
            return;
        }
        // Compute intervals between consecutive taps
        const intervals = taps
            .slice(1)
            .map((t, i) => t - taps[i]);

        // Average interval -> Focus Score
        const avgInterval =
            intervals.reduce((sum, v) => sum + v, 0) / intervals.length;
        const newScore = intervalToScore(avgInterval, cfg);

        // Variability (Standard Deviation) -> Calm Score
        // Lower variability = Higher Calm
        const variance = intervals.reduce((sum, v) => sum + Math.pow(v - avgInterval, 2), 0) / intervals.length;
        const stdDev = Math.sqrt(variance);

        // Map stdDev to 0-100 (Forgiving Curve)
        // 0-40ms variance: Perfect Calm (Humanly possible consistency)
        // >300ms variance: Chaos
        let newCalm = 0;
        if (stdDev <= 40) {
            newCalm = 100;
        } else {
            // Linear falloff from 40 to 300
            const maxDev = 300;
            const ratio = (maxDev - stdDev) / (maxDev - 40);
            newCalm = Math.max(0, Math.round(ratio * 100));
        }

        setScore(Math.round(newScore));
        setCalm(Math.round(newCalm));
    }, [cfg]);

    const onTap = useCallback(() => {
        const now = Date.now();
        tapsRef.current.push(now);
        // Keep only the last N taps to avoid unbounded growth
        if (tapsRef.current.length > 20) {
            tapsRef.current.shift();
        }
        computeScore();
    }, [computeScore]);

    const reset = useCallback(() => {
        tapsRef.current = [];
        setScore(0);
        setCalm(0);
    }, []);

    return {
        score,
        calm,
        isFocused: score >= focusThreshold,
        onTap,
        reset,
    };
}
