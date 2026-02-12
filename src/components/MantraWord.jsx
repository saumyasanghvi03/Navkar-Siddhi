import React, { useEffect, useState } from 'react';
import { LINE_COLORS } from '../utils/constants';

const MantraWord = ({ word, lineIndex }) => {
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
        text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold select-none text-center
        max-w-[90vw] break-words
        transition-all duration-300 ease-out transform
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
      style={{ color }}
    >
      {word}
    </div>
  );
};

export default MantraWord;
