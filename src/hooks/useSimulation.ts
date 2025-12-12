```typescript
import { useState, useEffect, useCallback } from 'react';

export const useSimulation = (isActive: boolean) => {
    const [metrics, setMetrics] = useState({
        pressure: 1013, // Barometric pressure (hPa)
        coherence: 0,   // 0-100%
        toxicity: 0,    // Simulated "cognitive toxicity"
        drift: 0,       // "Embedding drift"
        stormCell: false,
        focus: 0,       // Simulated focus percentage
        calm: 100       // Simulated calm percentage
    });

    const [controls, setControls] = useState({
        dampenersActive: false,
        vectorFieldStabilized: false
    });

    // Simulate data stream
    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setMetrics(prev => {
                // Random fluctuation logic
                const pressureChange = (Math.random() - 0.5) * 2;
                const newPressure = Math.max(980, Math.min(1040, prev.pressure + pressureChange));

                // Coherence tends to go up if dampeners are active
                const coherenceTrend = controls.dampenersActive ? 1 : (Math.random() - 0.5);
                const newCoherence = Math.max(0, Math.min(100, prev.coherence + coherenceTrend * 2));

                // Toxicity rises slowly if not flushed/stabilized
                const toxicityTrend = controls.vectorFieldStabilized ? -1 : 0.5;
                const newToxicity = Math.max(0, Math.min(100, prev.toxicity + toxicityTrend));

                return {
                    pressure: newPressure,
                    coherence: newCoherence,
                    toxicity: newToxicity,
                    drift: prev.drift + (Math.random() * 0.1),
                    stormCell: newPressure < 990 // Low pressure triggers "storm"
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, controls]);

    // Actions
    const deployDampeners = useCallback(() => {
        setControls(c => ({ ...c, dampenersActive: true }));
        setTimeout(() => setControls(c => ({ ...c, dampenersActive: false })), 5000);
    }, []);

    const stabilizeField = useCallback(() => {
        setControls(c => ({ ...c, vectorFieldStabilized: true }));
        setTimeout(() => setControls(c => ({ ...c, vectorFieldStabilized: false })), 5000);
    }, []);

    const flushContext = useCallback(() => {
        setMetrics(m => ({ ...m, toxicity: 0, drift: 0 }));
    }, []);

    return {
        metrics,
        controls,
        deployDampeners,
        stabilizeField,
        flushContext
    };
};
