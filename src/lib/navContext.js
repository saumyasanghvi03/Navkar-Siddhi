"use client";

import React, { createContext, useContext, useState } from 'react';

/**
 * Simple client-side navigation context.
 * Pages: 'jaap' | 'about' | 'tapsetup' | 'progress' | 'privacy'
 */
const NavContext = createContext({
  page: 'jaap',
  setPage: () => {},
  showLangHindi: true,
  setShowLangHindi: () => {},
});

export const NavProvider = ({ children }) => {
  const [page, setPage] = useState('jaap');
  const [showLangHindi, setShowLangHindi] = useState(true);

  return (
    <NavContext.Provider value={{ page, setPage, showLangHindi, setShowLangHindi }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);
