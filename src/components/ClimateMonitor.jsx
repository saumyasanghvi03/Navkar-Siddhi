import React from 'react';
import { useToast } from '../hooks/use-toast';
import { Power, Activity, Wind, CloudRain, AlertTriangle } from 'lucide-react';

const ClimateMonitor = ({ simulation }) => {
    const { metrics, controls, deployDampeners, stabilizeField, flushContext } = simulation;
    const { toast } = useToast();

    const handleAction = (actionName, actionFn) => {
        actionFn();
        toast({
            title: "System Action",
            description: `${actionName} initiated...`,
        });
    };

    return (
        <div className="absolute top-20 left-4 z-40 p-4 w-64 bg-black/80 backdrop-blur-md rounded-lg border border-cyan-500/30 text-cyan-400 font-mono text-xs shadow-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-cyan-500/30 pb-2">
                <Activity className="w-4 h-4 animate-pulse" />
                <h3 className="font-bold uppercase tracking-widest text-cyan-300">NeuroSim Environment</h3>
            </div>

            {/* Metrics Display */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                    <span>Barometric Pressure</span>
                    <span className={metrics.pressure < 990 ? "text-red-400" : "text-emerald-400"}>
                        {metrics.pressure.toFixed(1)} hPa
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span>Coherence Sync</span>
                    <div className="w-20 bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyan-400 transition-all duration-500"
                            style={{ width: `${metrics.coherence}%` }}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <span>Cog. Toxicity</span>
                    <div className="w-20 bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-purple-500 transition-all duration-500"
                            style={{ width: `${metrics.toxicity}%` }}
                        />
                    </div>
                </div>

                {metrics.stormCell && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-2 rounded animate-pulse">
                        <AlertTriangle className="w-4 h-4" />
                        <span>STORM CELL DETECTED</span>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="space-y-2">
                <button
                    onClick={() => handleAction("Dampeners", deployDampeners)}
                    disabled={controls.dampenersActive}
                    className={`w-full flex items-center justify-between p-2 rounded border transition-all ${controls.dampenersActive
                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                            : "bg-black/50 border-gray-700 hover:border-cyan-500/50 hover:bg-cyan-900/10"
                        }`}
                >
                    <span className="flex items-center gap-2">
                        <Wind className="w-3 h-3" />
                        Deploy Dampeners
                    </span>
                    {controls.dampenersActive && <span className="text-[10px] animate-spin">⟳</span>}
                </button>

                <button
                    onClick={() => handleAction("Vector Field Stabilization", stabilizeField)}
                    disabled={controls.vectorFieldStabilized}
                    className={`w-full flex items-center justify-between p-2 rounded border transition-all ${controls.vectorFieldStabilized
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                            : "bg-black/50 border-gray-700 hover:border-emerald-500/50 hover:bg-emerald-900/10"
                        }`}
                >
                    <span className="flex items-center gap-2">
                        <Power className="w-3 h-3" />
                        Stabilize Field
                    </span>
                    {controls.vectorFieldStabilized && <span className="text-[10px] animate-spin">⟳</span>}
                </button>

                <button
                    onClick={() => handleAction("Context Flush", flushContext)}
                    className="w-full flex items-center justify-between p-2 rounded border bg-black/50 border-gray-700 hover:border-red-500/50 hover:bg-red-900/10 transition-all"
                >
                    <span className="flex items-center gap-2">
                        <CloudRain className="w-3 h-3" />
                        Flush Context
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ClimateMonitor;
