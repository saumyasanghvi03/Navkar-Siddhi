"use client";

import App from '../App';
import { NavProvider } from '../lib/navContext';

export default function Page() {
  return (
    <NavProvider>
      <App />
    </NavProvider>
  );
}
