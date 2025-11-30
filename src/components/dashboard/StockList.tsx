"use client";

import { StockCard } from "./StockCard";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Link from "next/link";
import { STOCKS } from "@/lib/contracts";

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

function StockListItem({ symbol, name, price, logo, color }: StockListItemProps) {
    return (
        <Link href={`/dashboard/buy/${symbol}`}>
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl mb-3 border border-gray-50 hover:border-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full overflow-hidden relative ${color}`}>
                        {/* Placeholder logic */}
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                            {/* Image would go here */}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-base">{symbol}</h4>
                        <p className="text-xs text-gray-500">{name}</p>
                    </div>
                </div>

                <div className="h-10 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#eff6ff" strokeWidth={2} />
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
    return (
        <div className="py-6">
            <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Portfolio</h3>
                {/* Mobile: Horizontal Scroll, Desktop: Grid */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
                    <StockCard symbol="AAPL" name="Apple Inc" price={`${STOCKS.AAPL.rate} IDRX`} logo="" color="bg-black" />
                    <StockCard symbol="NVDA" name="Nvidia Corp" price={`${STOCKS.NVDA.rate} IDRX`} logo="" color="bg-green-500" />
                    <StockCard symbol="GOOGL" name="Google" price={`${STOCKS.GOOGL.rate} IDRX`} logo="" color="bg-blue-500" />
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-4">Favorite Stocks</h3>
                <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
                    <StockListItem symbol="AAPL" name="Apple Inc" price={`${STOCKS.AAPL.rate} IDRX`} logo="" color="bg-black" />
                    <StockListItem symbol="NVDA" name="Nvidia Corp" price={`${STOCKS.NVDA.rate} IDRX`} logo="" color="bg-green-500" />
                    <StockListItem symbol="GOOGL" name="Google" price={`${STOCKS.GOOGL.rate} IDRX`} logo="" color="bg-blue-500" />
                </div>
            </div>
        </div>
    );
}
