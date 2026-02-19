'use client';

import React, { useEffect, useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KPIGrid from '@/components/dashboard/KPIGrid';
import PnLChart from '@/components/dashboard/PnLChart';
import TradeHistoryTable from '@/components/dashboard/TradeHistoryTable';
import WinLossAnalysis from '@/components/dashboard/WinLossAnalysis';
import RiskMetrics from '@/components/dashboard/RiskMetrics';
import AdditionalMetrics from '@/components/dashboard/AdditionalMetrics';
import { generateTrades, calculateMetrics, Trade, AnalyticsMetrics } from '@/services/mockData';
import { subDays, isAfter, startOfDay } from 'date-fns';

export default function Home() {
  const [allTrades, setAllTrades] = useState<Trade[]>([]);
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  
  // Filter States
  const [timeFilter, setTimeFilter] = useState('30d');
  const [symbolFilter, setSymbolFilter] = useState('');

  useEffect(() => {
    // Simulate initial data fetching
    const data = generateTrades(100);
    setAllTrades(data);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...allTrades];

    // Time Filter
    const now = new Date();
    if (timeFilter === '7d') {
        const limit = subDays(now, 7);
        result = result.filter(t => isAfter(new Date(t.entryTime), limit));
    } else if (timeFilter === '1d') {
        const limit = startOfDay(now);
        result = result.filter(t => isAfter(new Date(t.entryTime), limit));
    } else if (timeFilter === '30d') {
         const limit = subDays(now, 30);
         result = result.filter(t => isAfter(new Date(t.entryTime), limit));
    }

    // Symbol Filter
    if (symbolFilter) {
        result = result.filter(t => t.symbol.toLowerCase().includes(symbolFilter.toLowerCase()));
    }

    setFilteredTrades(result);
    setMetrics(calculateMetrics(result));

  }, [allTrades, timeFilter, symbolFilter]);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-white mb-1">Trading Overview</h2>
          <p className="text-[#a0a0a0] text-sm">Welcome back, here is your portfolio performance.</p>
        </div>
        
        <div className="flex gap-2">
            <input 
                type="text" 
                placeholder="Filter Symbol..." 
                value={symbolFilter}
                onChange={(e) => setSymbolFilter(e.target.value)}
                className="bg-[#1c1c1c] text-white text-sm border border-[#333] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00ff9d] w-[150px]"
            />
            <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-[#1c1c1c] text-white text-sm border border-[#333] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00ff9d]"
            >
                <option value="30d">Last 30 Days</option>
                <option value="7d">Last 7 Days</option>
                <option value="1d">Today</option>
                <option value="all">All Time</option>
            </select>
            <button className="bg-[#00ff9d] text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#00d4ff] transition-colors shadow-[0_0_15px_rgba(0,255,157,0.3)]">
                Export Report
            </button>
        </div>
      </div>

      {metrics ? (
        <>
          <KPIGrid metrics={metrics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <PnLChart trades={filteredTrades} />
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

          <AdditionalMetrics metrics={metrics} />

          <div className="mb-8">
            <TradeHistoryTable trades={filteredTrades} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[50vh] flex-col gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#00ff9d] border-t-transparent animate-spin"></div>
            <p className="text-[#666] text-sm">Loading analytics...</p>
        </div>
      )}
    </DashboardLayout>
  );
}
