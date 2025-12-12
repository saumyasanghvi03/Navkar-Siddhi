import React from 'react';

const Dashboard = ({ history, totalNavkars, onClose }) => {
  // Compute Stats
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = history.find(h => h.date === today) || { navkars: 0 };

  const totalMalas = Math.floor(totalNavkars / 108);
  const malasToday = Math.floor(todayEntry.navkars / 108);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="bg-white/95 rounded-2xl shadow-2xl p-6 w-full max-w-sm relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-2"
        >
          ✕
        </button>

        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 text-center">Your Journey</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
            <div className="text-3xl font-bold text-orange-700">{todayEntry.navkars}</div>
            <div className="text-xs text-orange-600 uppercase tracking-wider mt-1">Navkars Today</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
            <div className="text-3xl font-bold text-blue-700">{malasToday}</div>
            <div className="text-xs text-blue-600 uppercase tracking-wider mt-1">Malas Today</div>
          </div>
          <div className="col-span-2 bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
            <div className="text-3xl font-bold text-purple-700">
              {todayEntry.samples > 0
                ? Math.round(todayEntry.stabilitySum / todayEntry.samples)
                : '-'}
            </div>
            <div className="text-xs text-purple-600 uppercase tracking-wider mt-1">Mind Stability Score</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Total Navkars</span>
            <span className="font-bold text-gray-800">{totalNavkars}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Total Malas</span>
            <span className="font-bold text-gray-800">{totalMalas}</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 italic font-serif">"Namo Arihantanam"</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
