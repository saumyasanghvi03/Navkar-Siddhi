import React, { useEffect, useRef } from 'react';

// Om Frequency (A=432Hz Standard)
const OM_FREQ = 432;

export const AdaptiveAudio = ({ enabled, brainState, soundscape = 'OM' }) => {
    const contextRef = useRef(null);
    const nodesRef = useRef(null);
    const bellTimeoutRef = useRef(null);

    // Initialize Audio Context & Drone
    useEffect(() => {
        if (!enabled) return;

        const initAudio = () => {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();

            // Master Gain
            const masterGain = ctx.createGain();
            masterGain.gain.value = 0.05;
            masterGain.connect(ctx.destination);

            // Breath LFO (Simulates inhaling/exhaling Om)
            // A slow sine wave that modulates volume
            const lfo = ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = 0.1; // 10 seconds per breath cycle
            const lfoGain = ctx.createGain();
            lfoGain.gain.value = 0.3; // Modulation depth
            lfo.connect(lfoGain);
            lfoGain.connect(masterGain.gain);

            // Vocal Chain (Sawtooth -> Formants)
            const vocalIn = ctx.createGain();
            vocalIn.gain.value = 0.5;
            vocalIn.connect(masterGain);

            // Fundamenta Oscillator (The Voice)
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth'; // Sawtooth has rich harmonics for vocal synthesis
            osc.frequency.value = OM_FREQ;

            // Formant Filters (The "Mouth" shape)
            // 'O' Formant 1
            const f1 = ctx.createBiquadFilter();
            f1.type = 'bandpass';
            f1.frequency.value = 450;
            f1.Q.value = 4;

            // 'O' Formant 2
            const f2 = ctx.createBiquadFilter();
            f2.type = 'bandpass';
            f2.frequency.value = 800;
            f2.Q.value = 4;

            // Connect Parallel Filters
            osc.connect(f1);
            osc.connect(f2);
            f1.connect(vocalIn);
            f2.connect(vocalIn);

            // Sub-bass 1 (Octave down - 216 Hz)
            const subOsc = ctx.createOscillator();
            subOsc.type = 'sine';
            subOsc.frequency.value = OM_FREQ / 2;
            const subGain = ctx.createGain();
            subGain.gain.value = 0.4;
            subOsc.connect(subGain);
            subGain.connect(masterGain); // Bypass formants for clean low end

            // Sub-bass 2 (Deep Hum - 108 Hz)
            const deepOsc = ctx.createOscillator();
            deepOsc.type = 'sine';
            deepOsc.frequency.value = OM_FREQ / 4;
            const deepGain = ctx.createGain();
            deepGain.gain.value = 0.6; // Strong foundation
            deepOsc.connect(deepGain);
            deepGain.connect(masterGain);

            osc.start();
            subOsc.start();
            deepOsc.start();
            lfo.start();

            contextRef.current = ctx;
            nodesRef.current = { masterGain, f1, f2, osc, subGain, deepGain };
        };

        // Initialize if not already
        if (!contextRef.current) {
            initAudio();
        }

        return () => {
            if (contextRef.current) {
                contextRef.current.close();
                contextRef.current = null;
            }
            if (bellTimeoutRef.current) clearTimeout(bellTimeoutRef.current);
        };
    }, [enabled]);

    // Modulate Drone based on Brain State & Soundscape
    useEffect(() => {
        if (!contextRef.current || !nodesRef.current || !enabled) return;

        const { masterGain, f1, f2 } = nodesRef.current;
        const now = contextRef.current.currentTime;
        const rampTime = 2.0;

        let targetVolume = 0.05;
        // Modulate Formants to shift vowel slightly (O -> A -> M) based on state
        let targetF1 = 450; // 'O' 
        let targetF2 = 800; // 'O'

        // Gold (Flow): "Aaaa" (Open)
        // Indigo (Deep): "Mmmm" (Closed)

        switch (brainState) {
            case 'gold': // High Focus + High Calm (Flow)
                targetVolume = 0.35; // Significantly louder/clearer
                targetF1 = 700; // 'A' (Open)
                targetF2 = 1250; // Higher resonance
                // In a real synth, we might also add upper harmonics here
                break;
            case 'cyan': // Active Focus
                targetVolume = 0.25;
                targetF1 = 550; // 'O'ish
                targetF2 = 950;
                break;
            case 'indigo': // Deep Calm
                targetVolume = 0.25;
                targetF1 = 300; // 'M'ish (Deep hum)
                targetF2 = 450;
                break;
            case 'orange': // Distracted
            default:
                targetVolume = 0.08; // Quiet but audible guidance
                targetF1 = 400; // Muffled
                targetF2 = 700;
                break;
        }

        // If Soundscape is NOT 'OM', mute the drone
        if (soundscape !== 'OM') {
            targetVolume = 0;
        }

        masterGain.gain.setTargetAtTime(targetVolume, now, rampTime);
        f1.frequency.setTargetAtTime(targetF1, now, rampTime);
        f2.frequency.setTargetAtTime(targetF2, now, rampTime);

    }, [brainState, enabled, soundscape]);

    // Temple Bell Logic
    useEffect(() => {
        if (!enabled || soundscape !== 'TEMPLE' || !contextRef.current) {
            if (bellTimeoutRef.current) clearTimeout(bellTimeoutRef.current);
            return;
        }

        const playBell = () => {
            const ctx = contextRef.current;
            if (!ctx) return;
            const now = ctx.currentTime;

            // Bell Synthesis: Additive Synthesis with inharmonic partials
            const fundamental = 200; // Hz
            const partials = [0.5, 1, 1.18, 1.5, 2, 2.74, 3, 3.81, 4.2]; // Complex bell spectrum
            const masterVol = ctx.createGain();
            masterVol.connect(ctx.destination);
            masterVol.gain.setValueAtTime(0.3, now); // Master volume for bell

            partials.forEach((ratio, i) => {
                const osc = ctx.createOscillator();
                osc.type = i === 0 ? 'sine' : 'triangle'; // Mix sine/triangle
                osc.frequency.value = fundamental * ratio;

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(1.0 / (i + 1), now + 0.02); // Attack
                gain.gain.exponentialRampToValueAtTime(0.001, now + 4 + (Math.random() * 2)); // Long varying decay

                osc.connect(gain);
                gain.connect(masterVol);

                osc.start(now);
                osc.stop(now + 6);
            });

            // Schedule next bell randomly between 10-20 seconds
            bellTimeoutRef.current = setTimeout(playBell, 10000 + Math.random() * 10000);
        };

        // Start loop
        playBell();

        return () => {
            if (bellTimeoutRef.current) clearTimeout(bellTimeoutRef.current);
        };
    }, [soundscape, enabled]);

    return null;
};

export default AdaptiveAudio;
