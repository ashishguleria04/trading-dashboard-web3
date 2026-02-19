'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KPIGrid from '@/components/dashboard/KPIGrid';
import PnLChart from '@/components/dashboard/PnLChart';
import TradeHistoryTable from '@/components/dashboard/TradeHistoryTable';
import WinLossAnalysis from '@/components/dashboard/WinLossAnalysis';
import RiskMetrics from '@/components/dashboard/RiskMetrics';
import { generateTrades, calculateMetrics, Trade, AnalyticsMetrics } from '@/services/mockData';

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);

  useEffect(() => {
    // Simulate data fetching
    const data = generateTrades(50);
    setTrades(data);
    setMetrics(calculateMetrics(data));
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-white mb-1">Trading Overview</h2>
          <p className="text-[#a0a0a0] text-sm">Welcome back, here is your portfolio performance.</p>
        </div>
        
        <div className="flex gap-2">
          <select className="bg-[#1c1c1c] text-white text-sm border border-[#333] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00ff9d]">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Today</option>
          </select>
          <button className="bg-[#00ff9d] text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#00d4ff] transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {metrics ? (
        <>
          <KPIGrid metrics={metrics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <PnLChart trades={trades} />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
               <div className="h-[200px]">
                  <WinLossAnalysis metrics={metrics} />
               </div>
               <div className="flex-1">
                  <RiskMetrics metrics={metrics} />
               </div>
            </div>
          </div>

          <div className="mb-8">
            <TradeHistoryTable trades={trades} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[50vh] text-[#666]">
          Loading analytics...
        </div>
      )}
    </DashboardLayout>
  );
}
