import React, { useEffect, useState } from 'react';
import { LINE_COLORS } from '../utils/constants';

const MantraWord = ({ word, wordHindi, lineIndex }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, [word]);

  const color = LINE_COLORS[lineIndex] || LINE_COLORS[0];

  return (
    <div
      className={`
        flex flex-col items-center gap-2
        max-w-[90vw] break-words
        transition-all duration-300 ease-out transform
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
    >
      {/* English/Prakrit word */}
      <div
        className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold select-none text-center"
        style={{ color }}
      >
        {word}
      </div>
      {/* Hindi word */}
      {wordHindi && (
        <div
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold select-none text-center"
          style={{ color }}
        >
          {wordHindi}
        </div>
      )}
    </div>
  );
};

export default MantraWord;
