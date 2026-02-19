'use client';

import React from 'react';
import { AnalyticsMetrics } from '@/services/mockData';
import { Target, Clock, AlertTriangle } from 'lucide-react';

interface RiskMetricsProps {
  metrics: AnalyticsMetrics;
}

const RiskMetrics = ({ metrics }: RiskMetricsProps) => {
  return (
    <div className="bg-[#141414] border border-[#333] p-6 rounded-xl h-full flex flex-col justify-between">
      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
        <Target size={18} className="text-[#ffcc00]" />
        Risk Analysis
      </h3>

      <div className="space-y-5">
        <div>
           <div className="flex justify-between text-sm mb-1">
             <span className="text-[#a0a0a0]">Avg Win / Loss</span>
             <span className="text-white font-medium">${metrics.avgWin.toFixed(2)} / <span className="text-[#ff3b3b]">${metrics.avgLoss.toFixed(2)}</span></span>
           </div>
           <div className="h-2 bg-[#252525] rounded-full overflow-hidden flex">
             <div className="bg-[#00ff9d]" style={{ width: `${(metrics.avgWin / (metrics.avgWin + metrics.avgLoss)) * 100}%` }}></div>
             <div className="bg-[#ff3b3b]" style={{ width: `${(metrics.avgLoss / (metrics.avgWin + metrics.avgLoss)) * 100}%` }}></div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-[#1c1c1c] p-3 rounded-lg border border-[#333]">
                <p className="text-xs text-[#666] mb-1">Largest Win</p>
                <p className="text-[#00ff9d] font-bold font-display">+${metrics.largestWin.toFixed(2)}</p>
            </div>
            <div className="bg-[#1c1c1c] p-3 rounded-lg border border-[#333]">
                <p className="text-xs text-[#666] mb-1">Max Drawdown</p>
                <p className="text-[#ff3b3b] font-bold font-display">-${metrics.largestLoss.toFixed(2)}</p>
            </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-[#252525]">
            <Clock size={16} className="text-[#00d4ff]" />
            <div>
                <p className="text-xs text-[#666]">Avg Hold Time</p>
                <p className="text-white font-medium">{metrics.avgDuration}</p>
            </div>
             <div className="ml-auto text-right">
                <p className="text-xs text-[#666]">Total Trades</p>
                <p className="text-white font-medium">{metrics.totalTrades}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;
