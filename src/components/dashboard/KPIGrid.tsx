'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity, Trophy, TrendingUp } from 'lucide-react';

interface KPIGridProps {
  metrics: {
    totalPnL: number;
    winRate: number;
    profitFactor: number;
    totalVolume: number;
    totalTrades: number;
  };
}

const KPIGrid = ({ metrics }: KPIGridProps) => {
  const stats = [
    {
      label: 'Total PnL',
      value: `$${metrics.totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+12.5%',
      isPositive: metrics.totalPnL >= 0,
      icon: DollarSign,
      color: 'text-[#00ff9d]',
      bg: 'bg-[rgba(0,255,157,0.1)]',
    },
    {
      label: 'Win Rate',
      value: `${metrics.winRate.toFixed(1)}%`,
      change: '+2.1%',
      isPositive: metrics.winRate > 50,
      icon: Trophy,
      color: 'text-[#ffcc00]',
      bg: 'bg-[rgba(255,204,0,0.1)]',
    },
    {
      label: 'Profit Factor',
      value: metrics.profitFactor.toFixed(2),
      change: '-0.3',
      isPositive: metrics.profitFactor > 1.5,
      icon: TrendingUp,
      color: 'text-[#00d4ff]',
      bg: 'bg-[rgba(0,212,255,0.1)]',
    },
    {
      label: 'Total Volume',
      value: `$${(metrics.totalVolume / 1000000).toFixed(2)}M`,
      change: '+5.4%',
      isPositive: true,
      icon: Activity,
      color: 'text-[#9d00ff]',
      bg: 'bg-[rgba(157,0,255,0.1)]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#141414] border border-[#333] p-6 rounded-xl hover:border-[#444] transition-colors relative overflow-hidden group">
          <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
            <stat.icon size={60} />
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-[#00ff9d]' : 'text-[#ff3b3b]'}`}>
              {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span>{stat.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-[#a0a0a0] text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-white font-display tracking-wide">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIGrid;
