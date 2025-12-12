# BMAD Product Vision: Navkar Siddhi Tap (Neuro Edition)

**Role**: Product Manager Agent
**Date**: 2025-12-11
**Status**: Active

## 1. Executive Summary
Navkar Siddhi Tap is transitioning from a passive counter app to an active **biofeedback-enhanced spiritual tool**. The goal is to close the loop between the user's mental state and their ritual practice, using consumer EEG hardware to validate and encourage "Shukla Dhyān" (pure concentration).

## 2. User Personas
*   **The Devout Practitioner**: Wants to ensure their "Navkar" is counted only when they are truly focused.
*   **The Tech-Spiritualist**: Use experimentation (quantified self) to improve meditation depth.

## 3. Core Epics (Phase 2 - Hardware)
### Epic 1: Hardware Abstraction Layer
*   **Goal**: Connect to Muse 2/S and Neurosity Crown without changing app logic.
*   **Requirement**: Zero-config Bluetooth/Wi-Fi connection flow within the browser.

### Epic 2: Neuro-Responsive UI
*   **Goal**: Visuals that react instantly (<200ms) to brain state.
*   **Requirement**: "Aura" component (already prototyped) driven by live data.

### Epic 3: Session Analytics
*   **Goal**: "Dhyān Score" post-session.
*   **Requirement**: Time-series charts of Focus/Calm vs. Bead Count.

## 4. Success Metrics
*   **Latency**: < 300ms from brain spike to UI change.
*   **Stability**: No disconnects > 5s during a 108-bead cycle.
*   **Adoption**: User toggles "Connect Headband" successfully.
