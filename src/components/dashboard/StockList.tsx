"use client";

import { StockCard } from "./StockCard";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Link from "next/link";
import { STOCKS } from "@/lib/contracts";
import { usePortfolio } from "@/hooks/usePortfolio";
import { formatNumber } from "@/utils/format";

// Mock data for sparklines
const data = [
    { value: 100 }, { value: 120 }, { value: 110 }, { value: 140 }, { value: 130 }, { value: 160 }, { value: 150 }, { value: 170 }
];

interface StockListItemProps {
    symbol: string;
    name: string;
    price: string;
    logo: string;
    color: string;
}

import Image from "next/image";

// ...

function StockListItem({ symbol, name, price, logo, color }: StockListItemProps) {
    // Generate random sparkline data for this item
    // Use symbol string to seed randomness so it's consistent for the same symbol but different across symbols
    const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const data = Array.from({ length: 10 }).map((_, i) => ({
        value: 100 + Math.sin((i + seed) * 0.5) * 20 + (Math.random() * 10)
    }));

    const isPositive = data[data.length - 1].value >= data[0].value;
    const strokeColor = isPositive ? "#22c55e" : "#ef4444"; // Green or Red
    const fillColor = isPositive ? "#dcfce7" : "#fee2e2"; // Light Green or Light Red

    return (
        <Link href={`/dashboard/buy/${symbol}`}>
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl mb-3 border border-gray-50 hover:border-gray-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full overflow-hidden relative bg-white shadow-sm border border-gray-100 transition-transform group-hover:scale-105`}>
                        {logo ? (
                            <div className="absolute inset-2">
                                <Image src={logo} alt={symbol} fill className="object-contain" />
                            </div>
                        ) : (
                            <div className={`absolute inset-0 flex items-center justify-center text-white font-bold ${color}`}>
                                {symbol[0]}
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-base group-hover:text-blue-600 transition-colors">{symbol}</h4>
                        <p className="text-xs text-gray-500">{name}</p>
                    </div>
                </div>

                <div className="h-10 w-24 opacity-70 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={strokeColor}
                                fill={fillColor}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="text-right">
                    <p className="font-bold text-base">{price}</p>
                </div>
            </div>
        </Link>
    )
}

export function StockList() {
    const { stocks } = usePortfolio();

    const stockList = Object.entries(STOCKS).map(([symbol, data]) => ({
        symbol,
        name: data.name,
        price: data.rate,
        color: data.color,
        logo: data.logo,
        balance: parseFloat(stocks[symbol]?.formattedBalance || "0"),
    }));

    const ownedStocks = stockList.filter(s => s.balance > 0);

    return (
        <div className="py-6 space-y-8">
            {/* Your Assets Section */}
            <div>
                <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="font-bold text-lg">Your Assets</h3>
                    {ownedStocks.length > 0 && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{ownedStocks.length} Stocks</span>}
                </div>

                {ownedStocks.length > 0 ? (
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
                        {ownedStocks.map(stock => (
                            <StockCard
                                key={stock.symbol}
                                symbol={stock.symbol}
                                name={stock.name}
                                price={`${formatNumber(stock.price)} IDRX`}
                                logo={stock.logo}
                                color={stock.color}
                                ownedAmount={stock.balance}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
                        <p className="text-gray-500 mb-2">You don't own any stocks yet.</p>
                        <p className="text-xs text-gray-400">Start trading to build your portfolio.</p>
                    </div>
                )}
            </div>

            {/* Market Section */}
            <div>
                <h3 className="font-bold text-lg mb-4 px-1">Explore Market</h3>
                <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
                    {stockList.map(stock => (
                        <StockListItem
                            key={stock.symbol}
                            symbol={stock.symbol}
                            name={stock.name}
                            price={`${formatNumber(stock.price)} IDRX`}
                            logo={stock.logo}
                            color={stock.color}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
