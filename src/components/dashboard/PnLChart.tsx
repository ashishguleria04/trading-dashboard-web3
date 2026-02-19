'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext
} from 'chart.js';
import { Trade } from '@/services/mockData';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface PnLChartProps {
  trades: Trade[];
}

const PnLChart = ({ trades }: PnLChartProps) => {
  // Sort trades by entry time asc for chart
  const sortedTrades = [...trades].sort((a, b) => new Date(a.entryTime).getTime() - new Date(b.entryTime).getTime());
  
  let cumulativePnL = 0;
  const dataPoints = sortedTrades.map(trade => {
    cumulativePnL += trade.pnl;
    return cumulativePnL;
  });
  
  const labels = sortedTrades.map(trade => format(new Date(trade.entryTime), 'MMM dd'));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: '#1c1c1c',
        titleColor: '#fff',
        bodyColor: '#a0a0a0',
        borderColor: '#333',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
            label: function(context: any) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
            }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
          font: {
            family: "'Inter', sans-serif",
            size: 11
          }
        },
        border: {
            display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(51, 51, 51, 0.5)',
        },
        ticks: {
          color: '#666',
          callback: function(value: any) {
            return '$' + value;
          },
          font: {
            family: "'Inter', sans-serif",
            size: 11
          }
        },
        border: {
            display: false
        }
      },
    },
    elements: {
        line: {
            tension: 0.4
        },
        point: {
            radius: 0,
            hoverRadius: 6,
            hoverBackgroundColor: '#00ff9d',
            hoverBorderColor: '#fff',
            hoverBorderWidth: 2
        }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Cumulative PnL',
        data: dataPoints,
        borderColor: '#00ff9d',
        borderWidth: 2,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(0, 255, 157, 0.2)');
          gradient.addColorStop(1, 'rgba(0, 255, 157, 0)');
          return gradient;
        },
      },
    ],
  };

  return (
    <div className="bg-[#141414] border border-[#333] p-6 rounded-xl h-[400px] w-full relative group hover:border-[#444] transition-colors">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"></span>
            Equity Curve
        </h3>
        <div className="h-[320px] w-full">
            <Line options={options} data={data} />
        </div>
    </div>
  );
};

export default PnLChart;
