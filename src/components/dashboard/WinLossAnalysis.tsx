'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { AnalyticsMetrics } from '@/services/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

interface WinLossProps {
  metrics: AnalyticsMetrics;
}

const WinLossAnalysis = ({ metrics }: WinLossProps) => {
  const winLossData = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [metrics.winRate, 100 - metrics.winRate],
        backgroundColor: ['rgba(0, 255, 157, 0.8)', 'rgba(255, 59, 59, 0.8)'],
        borderColor: ['#0a0a0a', '#0a0a0a'],
        borderWidth: 2,
      },
    ],
  };

  const longShortData = {
    labels: ['Longs', 'Shorts'],
    datasets: [
      {
        data: [metrics.longShortRatio, 100 - metrics.longShortRatio],
        backgroundColor: ['rgba(0, 212, 255, 0.8)', 'rgba(157, 0, 255, 0.8)'],
        borderColor: ['#0a0a0a', '#0a0a0a'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
            color: '#a0a0a0',
            font: {
                family: "'Inter', sans-serif",
                size: 11
            },
            boxWidth: 10,
            usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#1c1c1c',
        titleColor: '#fff',
        bodyColor: '#a0a0a0',
        callbacks: {
            label: function(context: any) {
                return ` ${context.label}: ${context.parsed.toFixed(1)}%`;
            }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="bg-[#141414] border border-[#333] p-4 rounded-xl flex flex-col items-center justify-center relative">
        <h4 className="absolute top-4 left-4 text-xs font-medium text-[#666] uppercase tracking-wider">Win Ratio</h4>
        <div className="h-[140px] w-[140px] relative">
            <Doughnut data={winLossData} options={options} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-display font-bold text-lg">{metrics.winRate.toFixed(0)}%</span>
            </div>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#333] p-4 rounded-xl flex flex-col items-center justify-center relative">
        <h4 className="absolute top-4 left-4 text-xs font-medium text-[#666] uppercase tracking-wider">Direction</h4>
        <div className="h-[140px] w-[140px] relative">
            <Doughnut data={longShortData} options={options} />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[#00d4ff] font-display font-bold text-lg">L</span>
                <span className="text-[#666] mx-1">/</span>
                <span className="text-[#9d00ff] font-display font-bold text-lg">S</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WinLossAnalysis;
