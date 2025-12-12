"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const RADIUS = 140; // Radius of the circle
const BEAD_RADIUS = 8; // Radius of each bead
const MERU_BEAD_RADIUS = 14; // Radius of the larger 'meru' bead

export function Mala({ count, beadColor = 'hsl(var(--primary))', totalBeads = 108 }: { count: number; beadColor?: string, totalBeads?: number }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        // Render a placeholder to avoid layout shift
        return <div className="relative w-full h-full flex items-center justify-center pointer-events-none opacity-0" aria-hidden="true"></div>;
    }

    const filledCount = count > 0 ? count % totalBeads : 0;
    const displayCount = (count > 0 && count % totalBeads === 0) ? totalBeads : filledCount;
    const isComplete = displayCount === totalBeads;

    // Rotation: "Pull" the beads so the current (active) bead is always at the TOP (-90deg position)
    // Each bead is spaced by (360 / totalBeads) degrees.
    // If count is 0, Bead 0 is at Top.
    // If count is 1, Bead 1 should be at Top. So we rotate by -(1 * spacing).
    const spacingAngle = 360 / totalBeads;
    // We offset by 0 because beads are generated starting at -PI/2 (Top) already.
    const rotation = -(count * spacingAngle);

    const beads = [];
    for (let i = 0; i < totalBeads; i++) {
        // Generate beads starting from top (-PI/2)
        const angle = (i / totalBeads) * 2 * Math.PI - Math.PI / 2;
        const x = RADIUS * Math.cos(angle);
        const y = RADIUS * Math.sin(angle);
        beads.push({ x, y, index: i });
    }

    // Meru bead stays static relative to the ring, so it rotates WITH the ring.
    // Wait, physically the Meru bead is part of the string.
    // So it should rotate with the beads.
    // Initial position of Meru: Between last and first? Usually it's the "knot".
    // Let's place it at the "top" start position (before rotation).
    // Actually, usually you don't cross the Meru. You turn around.
    // But for this infinite counter, we just loop.
    // Placing Meru at -90deg (Top) implies it sits between Bead N-1 and Bead 0.
    // Let's place it slightly outside the ring radius at the top.
    const meruAngle = -Math.PI / 2;
    // We want the Meru to be "between" bead 0 and bead 107.
    // But visually, simpler is fine.

    // Let's refine the Meru position to be fixed at the *Top of the Screen*?
    // No, if the ring rotates, the Meru (knot) rotates away.
    // And the user holds the "Current Bead" at the top.
    // So the Meru rotates.
    // At count 0: Meru is at Top (or Bottom?).
    // Let's say you start at the Meru.
    // So Meru should be just "before" Bead 0.
    // If Bead 0 is at -90deg.
    // Let's place Meru at -90 - (spacing/2) deg.
    const meruPlacementAngle = meruAngle - ((spacingAngle * Math.PI / 180) / 2);
    const meruX = (RADIUS) * Math.cos(meruPlacementAngle); // Same radius, just between beads
    const meruY = (RADIUS) * Math.sin(meruPlacementAngle);
    // Actually, Meru usually sticks out.
    const meruX_Visual = (RADIUS + 15) * Math.cos(meruAngle);
    const meruY_Visual = (RADIUS + 15) * Math.sin(meruAngle);


    return (
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Gradient Overlay to simulate depth/focus area at the top */}
            <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none opacity-50" />

            <svg
                viewBox={`-${RADIUS + 50} -${RADIUS + 50} ${2 * (RADIUS + 50)} ${2 * (RADIUS + 50)}`}
                className="w-full h-auto max-w-[85vmin] max-h-[85vmin]"
                style={{
                    filter: isComplete ? `drop-shadow(0 0 15px ${beadColor})` : 'none',
                    transition: 'filter 1s ease-in-out'
                }}
            >
                <g
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: 'center',
                        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' // Spring-like feel
                    }}
                >
                    {/* Connection String */}
                    <circle cx="0" cy="0" r={RADIUS} fill="none" stroke="hsla(var(--foreground), 0.1)" strokeWidth="1" />

                    {/* Meru Bead (The Guru Bead) */}
                    {/* We place it so that at count 0, it is at the top. */}
                    {/* But we want bead 0 at the top. */}
                    {/* So Meru sits "behind" bead 0? Or between Last and First. */}
                    {/* Let's place it at angle (360 -> 0) boundary. */}
                    {/* Since Bead 0 is at -90deg. Bead N-1 is at -90 - spacing. */}
                    {/* Let's Put Meru "above" the ring, fixed to the string. */}
                    <line x1={0} y1={-RADIUS} x2={0} y2={-RADIUS - 20} stroke="hsla(var(--foreground), 0.3)" strokeWidth="2" />
                    <circle
                        cx={0}
                        cy={-RADIUS - 25}
                        r={MERU_BEAD_RADIUS}
                        fill={isComplete ? beadColor : 'hsla(var(--foreground), 0.2)'}
                        stroke="hsla(var(--foreground), 0.4)"
                        strokeWidth="2"
                        className="transition-colors duration-500"
                    />

                    {/* Beads */}
                    {beads.map((bead, i) => {
                        const isFilled = i < displayCount;
                        // The "Active" bead is the one currently being "counted" (next to be filled).
                        // Wait, displayCount is "filled ones". 
                        // So index `displayCount` is the one *currently active* (empty).
                        // BUT, due to rotation, the "Top" bead is always index `count % total`.
                        // So visually, the top bead is `beads[count % total]`.
                        const isActive = i === (count % totalBeads);

                        return (
                            <circle
                                key={i}
                                cx={bead.x}
                                cy={bead.y}
                                r={isActive ? BEAD_RADIUS + 3 : BEAD_RADIUS}
                                fill={isFilled ? beadColor : 'hsla(var(--foreground), 0.1)'}
                                stroke={isFilled ? 'hsla(var(--foreground), 0.3)' : (isActive ? beadColor : 'hsla(var(--foreground), 0.2)')}
                                strokeWidth={isActive ? 2 : 1}
                                className={cn(
                                    "transition-all duration-300",
                                    isActive && !isFilled && "animate-pulse" // Gentle pulse for the bead you are 'on'
                                )}
                                style={{
                                    opacity: isActive ? 1 : 0.6 // Focus on active bead
                                }}
                            />
                        );
                    })}
                </g>

                {/* Fixed Focus Ring at the Top (Like a cursor) */}
                <circle cx={0} cy={-RADIUS} r={BEAD_RADIUS + 8} fill="none" stroke="hsla(var(--foreground), 0.1)" strokeWidth="1" opacity={0.5} strokeDasharray="4 2" />
            </svg>
        </div>
    );
}
