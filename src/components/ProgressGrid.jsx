import React from 'react';

const ProgressGrid = ({ totalNavkars, currentTheme, malaSize = 108 }) => {
  // Calculate grid layout based on mala size
  const filledCount = totalNavkars % malaSize;
  const boxes = Array.from({ length: malaSize }, (_, i) => i);

  // Determine grid columns based on mala size
  // 9: 3x3, 27: 9x3, 36: 6x6, 108: 12x9
  const getGridCols = (size) => {
    switch(size) {
      case 9: return 3;
      case 27: return 9;
      case 36: return 6;
      case 108: return 12;
      default: return 12;
    }
  };

  const gridCols = getGridCols(malaSize);

  // Default fill color if no theme is active
  const defaultFill = '#b91c1c'; // Deep Red
  const activeFill = currentTheme ? currentTheme.gridFill : defaultFill;

  return (
    <div className="fixed bottom-0 left-0 w-full p-2 pb-[calc(5rem+env(safe-area-inset-bottom))] bg-white/30 backdrop-blur-sm border-t border-white/20 z-10">
      <div 
        className="gap-[2px] max-w-md mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
        }}
      >
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
