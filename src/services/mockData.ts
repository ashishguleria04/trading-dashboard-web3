import { subDays, addMinutes, format } from 'date-fns';

export interface Trade {
    id: string;
    symbol: string;
    side: 'Long' | 'Short';
    entryPrice: number;
    exitPrice: number;
    size: number;
    pnl: number;
    fee: number;
    entryTime: string;
    exitTime: string;
    duration: string; // e.g., "15m 30s"
    status: 'Closed' | 'Open';
    type: 'Market' | 'Limit' | 'Stop';
}

export interface AnalyticsMetrics {
    totalPnL: number;
    totalVolume: number;
    winRate: number;
    totalTrades: number;
    avgWin: number;
    avgLoss: number;
    largestWin: number;
    largestLoss: number;
    profitFactor: number;
    longShortRatio: number; // % Long
    avgDuration: string;
}

const SYMBOLS = ['SOL-PERP', 'BTC-PERP', 'ETH-PERP', 'JUP-PERP', 'BONK-PERP'];
const SIDES = ['Long', 'Short'] as const;
const TYPES = ['Market', 'Limit', 'Stop'] as const;

// Helper to generate random number
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Generate Mock Trades
export const generateTrades = (count: number = 50): Trade[] => {
    const trades: Trade[] = [];
    let currentId = 1000;

    for (let i = 0; i < count; i++) {
        const isWin = Math.random() > 0.45; // 55% Win Rate roughly
        const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        const side = SIDES[Math.floor(Math.random() * SIDES.length)];
        const type = TYPES[Math.floor(Math.random() * TYPES.length)];

        // Price Simulation
        const basePrice = symbol.includes('BTC') ? 65000 : symbol.includes('ETH') ? 3500 : symbol.includes('SOL') ? 145 : symbol.includes('JUP') ? 1.2 : 0.00002;
        const entryPrice = basePrice * random(0.99, 1.01);
        const size = random(1000, 50000); // position size in USD

        // PnL Calculation
        // If win, move price in favor. If loss, move against.
        const movePercent = random(0.005, 0.05); // 0.5% to 5% move
        const priceChange = entryPrice * movePercent;

        let exitPrice;
        if (side === 'Long') {
            exitPrice = isWin ? entryPrice + priceChange : entryPrice - priceChange;
        } else {
            exitPrice = isWin ? entryPrice - priceChange : entryPrice + priceChange;
        }

        const rawPnL = (exitPrice - entryPrice) * (size / entryPrice) * (side === 'Long' ? 1 : -1);
        const fee = size * 0.0006; // 0.06% fee
        const pnl = rawPnL - fee;

        const entryDate = subDays(new Date(), Math.floor(random(0, 30)));
        const durationMin = Math.floor(random(5, 480)); // 5 mins to 8 hours
        const exitDate = addMinutes(entryDate, durationMin);

        trades.push({
            id: `TRD-${currentId++}`,
            symbol,
            side,
            entryPrice,
            exitPrice,
            size,
            pnl,
            fee,
            entryTime: entryDate.toISOString(),
            exitTime: exitDate.toISOString(),
            duration: `${Math.floor(durationMin / 60)}h ${durationMin % 60}m`,
            status: 'Closed',
            type,
        });
    }

    // Sort by exit time descending
    return trades.sort((a, b) => new Date(b.exitTime).getTime() - new Date(a.exitTime).getTime());
};

export const calculateMetrics = (trades: Trade[]): AnalyticsMetrics => {
    if (trades.length === 0) {
        return {
            totalPnL: 0, totalVolume: 0, winRate: 0, totalTrades: 0, avgWin: 0, avgLoss: 0, largestWin: 0, largestLoss: 0, profitFactor: 0, longShortRatio: 0, avgDuration: '0m'
        };
    }

    const closedTrades = trades.filter(t => t.status === 'Closed');
    const wins = closedTrades.filter(t => t.pnl > 0);
    const losses = closedTrades.filter(t => t.pnl <= 0);

    const totalPnL = closedTrades.reduce((acc, t) => acc + t.pnl, 0);
    const totalVolume = closedTrades.reduce((acc, t) => acc + t.size, 0);
    const totalWins = wins.reduce((acc, t) => acc + t.pnl, 0);
    const totalLosses = Math.abs(losses.reduce((acc, t) => acc + t.pnl, 0));

    const winRate = (wins.length / closedTrades.length) * 100;
    const avgWin = wins.length > 0 ? totalWins / wins.length : 0;
    const avgLoss = losses.length > 0 ? totalLosses / losses.length : 0;
    const profitFactor = totalLosses > 0 ? totalWins / totalLosses : totalWins;

    const longCount = closedTrades.filter(t => t.side === 'Long').length;
    const longShortRatio = (longCount / closedTrades.length) * 100;

    return {
        totalPnL,
        totalVolume,
        winRate,
        totalTrades: closedTrades.length,
        avgWin,
        avgLoss,
        largestWin: Math.max(...wins.map(t => t.pnl), 0),
        largestLoss: Math.min(...losses.map(t => t.pnl), 0),
        profitFactor,
        longShortRatio,
        avgDuration: '45m' // simplified, would calculate actual avg
    };
};
