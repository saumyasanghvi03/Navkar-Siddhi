import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const ConnectivityIndicator = () => {
  const isOnline = useOnlineStatus();

  return (
    <div className={`
      flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-500
      ${isOnline 
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 opacity-60' 
        : 'bg-orange-100 text-orange-700 border border-orange-200 animate-pulse'}
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]'}`} />
      <span>{isOnline ? 'Online' : 'Offline'}</span>
    </div>
  );
};

export default ConnectivityIndicator;
