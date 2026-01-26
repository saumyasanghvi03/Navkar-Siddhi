// @ts-nocheck
import { MuseClient, EEGReading, TelemetryData } from 'muse-js';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';
import { takeUntil, map, filter, catchError } from 'rxjs/operators';

// Define a safe interface for what we expose
export interface MuseMetrics {
    focus: number;
    calm: number;
    connected: boolean;
    signalQuality: number;
}

export class MuseManager {
    private muse: MuseClient | null = null;
    private destroy$ = new Subject<void>();

    // Observables
    public connectionStatus$ = new BehaviorSubject<boolean>(false);
    public rawEEG$ = new Subject<EEGReading>();
    public telemetry$ = new Subject<TelemetryData>();

    // Metrics Stream (Derived)
    public metrics$ = new BehaviorSubject<MuseMetrics>({
        focus: 0,
        calm: 0,
        connected: false,
        signalQuality: 0
    });

    constructor() {
        // Do not instantiate MuseClient here to avoid SSR issues
    }

    private getMuse(): MuseClient {
        if (!this.muse) {
            if (typeof window === 'undefined') {
                throw new Error('MuseClient can only be initialized in the browser');
            }
            this.muse = new MuseClient();
        }
        return this.muse;
    }

    async connect(): Promise<void> {
        try {
            const client = this.getMuse();
            await client.connect();
            await client.start();

            this.connectionStatus$.next(true);

            // Subscribe to raw readings
            client.eegReadings
                .pipe(takeUntil(this.destroy$))
                .subscribe(reading => {
                    this.rawEEG$.next(reading);
                    this.processReading(reading);
                });

            // Subscribe to telemetry
            client.telemetryData
                .pipe(takeUntil(this.destroy$))
                .subscribe(telemetry => {
                    this.telemetry$.next(telemetry);
                });

        } catch (err) {
            console.error('Muse Connection Failed:', err);
            this.connectionStatus$.next(false);
            throw err;
        }
    }

    disconnect() {
        if (this.muse) {
            this.muse.disconnect();
        }
        this.connectionStatus$.next(false);
        this.metrics$.next({ ...this.metrics$.value, connected: false });
        this.destroy$.next();
    }

    // --- Signal Processing ---
    // A simple robust algorithm: 
    // High variance in Beta (13-30Hz) implies active thought (Focus).
    // High variance in Alpha (8-13Hz) implies relaxation (Calm).
    // Given we only get RAW samples here, we must calculate FFT or use a simpler variance proxy.
    // For MVP transparency, we'll use a variance-based movement detector which is solid for "Stillness" (Calm)
    // and "Alpha" approximation.

    private buffer: number[] = [];
    private processReading(reading: EEGReading) {
        // reading.samples has 12 samples per packet usually
        // Average the channels for a single "Brain Activity" metric
        const avgValue = reading.samples.reduce((a, b) => a + Math.abs(b), 0) / reading.samples.length;

        this.buffer.push(avgValue);
        if (this.buffer.length > 256) { // ~1 second of data at 256Hz
            this.buffer.shift(); // sliding window
        }

        if (this.buffer.length >= 256) {
            const variance = this.calculateVariance(this.buffer);

            // Mapping Logic (Heuristic for demo):
            // Low variance = Calm (High Alpha/Theta usually correlates with steady signal)
            // High variance = Active/Movement/Blink (Focus/Distraction)

            // Normalize variance (experimental thresholds)
            // 0-10 uV variance -> 100% Calm
            // 100+ uV variance -> 0% Calm
            const calmScore = Math.max(0, Math.min(100, 100 - (variance / 2)));

            // Focus: Inverse of noise, but let's say "Steady Attention" = Focus.
            // Usually Gamma is hard to detect on raw without FFT.
            // We'll proxy Focus as "Alertness" -> slightly higher variance than deep sleep, but stable.
            // For now, let's map Focus to "Active Engagement" which might be inverse of Calm for this simple model.
            const focusScore = Math.max(0, Math.min(100, (variance / 5) * 10)); // scales up faster

            this.metrics$.next({
                focus: Math.round(focusScore),
                calm: Math.round(calmScore),
                connected: true,
                signalQuality: 100 // Assume good if receiving data
            });
        }
    }

    private calculateVariance(data: number[]): number {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        return data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    }
}

export const museManager = new MuseManager();
