# Walkthrough: Pivot to Touch Biometrics (Tap Rhythm Analysis)

## Background
The Navkar Siddhi Tap app originally aimed to integrate EEG hardware (Muse/Neurosity) to provide neuro‑responsive feedback during the ritual counting process.

## Reason for Pivot
Network issues prevented automated browser verification of the hardware flow. Server logs confirmed successful 200 OK responses after fixing the backend, but the hardware integration remained fragile and required user‑side Bluetooth/Wi‑Fi setup.

## Decision
We pivoted to **Touch Biometrics** using **Tap Rhythm Analysis**:
- Captures inter‑tap intervals via the device’s touch events.
- Maps rhythm patterns to mental‑state metrics (focus, calm).
- Eliminates the need for external EEG devices, simplifying deployment and improving reliability.

## Implementation Overview
- **Hook**: `useTapBiofeedback` implemented using standard deviation of tap intervals to compute `calm` and `focus` metrics.
- **State Management**: `useNavkar` updated to manage `malaSize` (9/27/108) and derive `brainState` (Gold, Cyan, Indigo, Orange).
- **UI Components**:
    - `LiveMetrics`: Real-time overlay for biofeedback scores.
    - `Controls`: Added Mala Size selector.
    - `MalaRing`: Dynamic bead count and toast notifications on completion.
    - `Aura`: Background visual effect reacting to `brainState`.

## Completed Steps
- [x] Implement `useTapBiofeedback` hook with variability analysis.
- [x] Create `LiveMetrics` overlay.
- [x] Update `Controls` for mala size selection.
- [x] Wire `brainState` to `Aura` and `MalaRing`.
- [x] Verify integration.

## Next Steps
- Gather user feedback on biofeedback sensitivity.
- Refine `brainState` thresholds if needed.
