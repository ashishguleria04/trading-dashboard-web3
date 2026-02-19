'use client';

import React from 'react';
import { AnalyticsMetrics } from '@/services/mockData';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Coins, Layers } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AdditionalMetricsProps {
  metrics: AnalyticsMetrics;
}

const AdditionalMetrics = ({ metrics }: AdditionalMetricsProps) => {
  const orderTypeData = {
    labels: ['Market', 'Limit', 'Stop'],
    datasets: [
      {
        label: '% of Trades',
        data: [metrics.orderTypeStats.Market, metrics.orderTypeStats.Limit, metrics.orderTypeStats.Stop],
        backgroundColor: ['rgba(0, 255, 157, 0.6)', 'rgba(157, 0, 255, 0.6)', 'rgba(0, 212, 255, 0.6)'],
        borderColor: ['#00ff9d', '#9d00ff', '#00d4ff'],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1c1c1c',
        titleColor: '#fff',
        bodyColor: '#a0a0a0',
        callbacks: {
            label: (context: any) => `${context.formattedValue}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#333' },
        ticks: { color: '#666' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#a0a0a0' }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Fee Analysis */}
      <div className="bg-[#141414] border border-[#333] p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <Coins size={80} className="text-[#ffcc00]" />
        </div>
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <Coins size={18} className="text-[#ffcc00]" />
            Fee Analysis
        </h3>
        
        <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold font-display text-white">
                ${metrics.totalFees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-sm text-[#666] mb-1">paid in fees</span>
        </div>
        <p className="text-xs text-[#a0a0a0] mb-4">
            Total fees paid across {metrics.totalTrades} trades. 
            Avg fee per trade: <span className="text-[#ffcc00]">${(metrics.totalFees / metrics.totalTrades).toFixed(2)}</span>
        </p>
        
        <div className="w-full bg-[#1c1c1c] rounded-full h-2 mb-1">
             <div className="bg-[#ffcc00] h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-[#666]">
            <span>Exchange Fees (100%)</span>
            <span>Funding (0%)</span>
        </div>
      </div>

      {/* Order Type Analysis */}
      <div className="bg-[#141414] border border-[#333] p-6 rounded-xl">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <Layers size={18} className="text-[#00d4ff]" />
            Order Types
        </h3>
        <div className="h-[150px]">
            <Bar options={options} data={orderTypeData} />
        </div>
      </div>
    </div>
  );
};

export default AdditionalMetrics;
