'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LineChart, PieChart, Settings, History, Wallet } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Analytics', href: '/analytics', icon: LineChart },
    { name: 'Portfolio', href: '/portfolio', icon: PieChart },
    { name: 'History', href: '/history', icon: History },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-[250px] h-screen bg-[#141414] border-r border-[#333] flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff9d] to-[#00d4ff] flex items-center justify-center">
          <span className="text-black font-bold text-lg">D</span>
        </div>
        <h1 className="text-xl font-bold font-display tracking-wide text-white">
          DERIVERSE
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[rgba(0,255,157,0.1)] text-[#00ff9d] border-l-2 border-[#00ff9d]'
                  : 'text-[#a0a0a0] hover:bg-[#1c1c1c] hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-[#00ff9d]' : 'group-hover:text-white'} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-[#333]">
        <button className="w-full py-3 px-4 bg-[#1c1c1c] hover:bg-[#252525] border border-[#333] rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium">
          <Wallet size={18} className="text-[#9d00ff]" />
          <span>Connect Wallet</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
