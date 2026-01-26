import React from 'react';

const CounterHeader = ({ totalCount }) => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 flex justify-end items-center pointer-events-none z-10">
      <div className="text-gray-600 font-serif text-sm bg-parchment/80 px-3 py-1 rounded-full border border-gray-200 shadow-sm backdrop-blur-sm">
        Total: <span className="font-bold text-gray-800">{totalCount}</span>
      </div>
    </header>
  );
};

export default CounterHeader;
