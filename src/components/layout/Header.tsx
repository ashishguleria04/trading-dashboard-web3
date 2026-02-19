'use client';

import React from 'react';
import { Bell, ChevronDown, User, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[#333] bg-[#141414]/90 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" size={18} />
          <input 
            type="text" 
            placeholder="Search symbol, wallet, or tx..." 
            className="w-full bg-[#1c1c1c] border border-[#333] rounded-md py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00ff9d] transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1c1c] border border-[#333]">
          <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"></div>
          <span className="text-xs font-medium text-[#a0a0a0]">Solana Mainnet</span>
        </div>

        <button className="relative text-[#a0a0a0] hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#ff3b3b] border-2 border-[#141414]"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-[#333]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Trader0x...8a2</p>
            <p className="text-xs text-[#00ff9d]">Level 1 Pro</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#252525] flex items-center justify-center border border-[#333]">
            <User size={18} className="text-[#a0a0a0]" />
          </div>
          <ChevronDown size={14} className="text-[#666]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
