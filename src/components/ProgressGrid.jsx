import React from 'react';

const ProgressGrid = ({ totalNavkars, currentTheme }) => {
  // 12 cols x 9 rows = 108
  const filledCount = totalNavkars % 108;
  const boxes = Array.from({ length: 108 }, (_, i) => i);

  // Default fill color if no theme is active
  const defaultFill = '#b91c1c'; // Deep Red
  const activeFill = currentTheme ? currentTheme.gridFill : defaultFill;

  return (
    <div className="fixed bottom-0 left-0 w-full p-2 pb-6 bg-white/30 backdrop-blur-sm border-t border-white/20">
      <div className="grid grid-cols-[repeat(12,minmax(0,1fr))] gap-[2px] max-w-md mx-auto">
        {boxes.map((i) => (
          <div
            key={i}
            className="aspect-square rounded-[1px] w-full transition-colors duration-200 flex items-center justify-center text-[8px] sm:text-[10px] font-medium"
            style={{
              backgroundColor: i < filledCount ? activeFill : 'rgba(0,0,0,0.1)',
              color: i < filledCount ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.4)'
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressGrid;
