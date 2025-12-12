// src/components/Aura.jsx
import React from 'react';

/**
 * Aura component renders a radial gradient halo behind the mantra words.
 * Props:
 *   enabled: boolean – whether the aura should be shown (Neuro Sim toggle).
 *   state: 'gold' | 'cyan' | 'indigo' | 'orange' – brain state colour.
 *   size: number – intensity factor (affects blur radius).
 */
const Aura = ({ enabled, state, size = 1 }) => {
    if (!enabled) return null;
    const colourMap = {
        gold: 'rgba(255,215,0,0.6)', // gold
        cyan: 'rgba(0,255,255,0.5)', // cyan
        indigo: 'rgba(75,0,130,0.6)', // indigo
        orange: 'rgba(255,165,0,0.5)', // orange
    };
    const colour = colourMap[state] || colourMap.orange;
    const blur = 80 * size; // larger size = bigger glow
    const style = {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `radial-gradient(circle at center, ${colour}, transparent)`,
        filter: `blur(${blur}px)`,
        zIndex: -1,
    };
    return <div style={style} />;
};

export default Aura;
