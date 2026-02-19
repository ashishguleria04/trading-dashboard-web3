'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[250px] w-[calc(100%-250px)]">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a] relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(157,0,255,0.05),_transparent_40%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,157,0.03),_transparent_40%)] pointer-events-none"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
