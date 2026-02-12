import React from 'react';

const LiveMetrics = ({ focus, calm, brainState }) => {
    // Define colors based on brainState
    const getColor = () => {
        switch (brainState) {
            case 'gold': return 'from-yellow-400 to-amber-600';
            case 'cyan': return 'from-cyan-400 to-blue-600';
            case 'indigo': return 'from-indigo-400 to-purple-600';
            case 'orange': return 'from-orange-400 to-red-600';
            default: return 'from-gray-400 to-gray-600';
        }
    };

    const gradient = getColor();

    return (
        <div className="fixed top-20 sm:top-24 right-2 sm:right-4 z-30 flex flex-col gap-3 pointer-events-none animate-in slide-in-from-right-10 fade-in duration-1000">

            {/* Focus Pill */}
            <div className="bg-white/60 backdrop-blur-md border border-gray-200 p-3 rounded-2xl shadow-sm flex items-center gap-3 w-32">
                <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-200" />
                        <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3"
                            className={`text-teal-600 transition-all duration-300 ease-out`}
                            strokeDasharray="100"
                            strokeDashoffset={100 - focus}
                        />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-gray-800">{focus}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Focus</span>
                    <span className="text-xs text-gray-900 font-bold opacity-90">Active</span>
                </div>
            </div>

            {/* Calm Pill */}
            <div className="bg-white/60 backdrop-blur-md border border-gray-200 p-3 rounded-2xl shadow-sm flex items-center gap-3 w-32">
                <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-200" />
                        <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3"
                            className={`text-teal-600 transition-all duration-300 ease-out`}
                            strokeDasharray="100"
                            strokeDashoffset={100 - calm}
                        />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-gray-800">{calm}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Calm</span>
                    <span className="text-xs text-gray-900 font-bold opacity-90">Deep</span>
                </div>
            </div>

            {/* Brain State Indicator */}
            <div className={`mt-2 h-1 w-full rounded-full bg-gradient-to-r ${gradient} opacity-80 blur-[2px]`} />

        </div>
    );
};

export default LiveMetrics;
