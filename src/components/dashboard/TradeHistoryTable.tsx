'use client';

import React from 'react';
import { Trade } from '@/services/mockData';
import { format } from 'date-fns';
import { Search, Filter } from 'lucide-react';

interface TradeHistoryProps {
  trades: Trade[];
}

const TradeHistoryTable = ({ trades }: TradeHistoryProps) => {
  return (
    <div className="bg-[#141414] border border-[#333] rounded-xl overflow-hidden flex flex-col h-full hover:border-[#444] transition-colors">
      <div className="p-4 border-b border-[#333] flex items-center justify-between">
        <h3 className="text-white font-medium flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-[#00d4ff]"></span>
            Recent Trades
        </h3>
        <div className="flex gap-2">
            <button className="p-2 text-[#a0a0a0] hover:text-white hover:bg-[#1c1c1c] rounded-md transition-colors">
                <Search size={18} />
            </button>
            <button className="p-2 text-[#a0a0a0] hover:text-white hover:bg-[#1c1c1c] rounded-md transition-colors">
                <Filter size={18} />
            </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-[#666] uppercase bg-[#1c1c1c] border-b border-[#333]">
            <tr>
              <th className="px-6 py-3 font-medium">Time / ID</th>
              <th className="px-6 py-3 font-medium">Symbol</th>
              <th className="px-6 py-3 font-medium">Side</th>
              <th className="px-6 py-3 font-medium text-right">Entry Price</th>
              <th className="px-6 py-3 font-medium text-right">Exit Price</th>
              <th className="px-6 py-3 font-medium text-right">Size</th>
              <th className="px-6 py-3 font-medium text-right">PnL</th>
              <th className="px-6 py-3 font-medium text-center">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#252525]">
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-[#1c1c1c] transition-colors group">
                <td className="px-6 py-4">
                  <div className="text-white font-medium">{format(new Date(trade.entryTime), 'HH:mm:ss')}</div>
                  <div className="text-xs text-[#666] group-hover:text-[#888]">{format(new Date(trade.entryTime), 'MMM dd')}</div>
                </td>
                <td className="px-6 py-4 font-medium text-white">
                  {trade.symbol}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    trade.side === 'Long' 
                      ? 'bg-[rgba(0,255,157,0.1)] text-[#00ff9d]' 
                      : 'bg-[rgba(255,59,59,0.1)] text-[#ff3b3b]'
                  }`}>
                    {trade.side}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-[#a0a0a0]">
                  ${trade.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </td>
                <td className="px-6 py-4 text-right text-[#a0a0a0]">
                  ${trade.exitPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </td>
                <td className="px-6 py-4 text-right text-white">
                  ${Math.round(trade.size).toLocaleString()}
                </td>
                <td className={`px-6 py-4 text-right font-medium ${trade.pnl >= 0 ? 'text-[#00ff9d]' : 'text-[#ff3b3b]'}`}>
                  <div className="flex items-center justify-end gap-1">
                    {trade.pnl >= 0 ? '+' : ''}${Math.abs(trade.pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </td>
                 <td className="px-6 py-4 text-center text-[#666]">
                  {trade.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistoryTable;
