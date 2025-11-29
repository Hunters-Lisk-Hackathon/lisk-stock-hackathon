"use client";

import Image from "next/image";

interface StockCardProps {
    symbol: string;
    name: string;
    price: string;
    logo: string; // URL or path to logo
    color?: string; // Optional background color/gradient for logo placeholder
}

export function StockCard({ symbol, name, price, logo, color }: StockCardProps) {
    return (
        <div className="min-w-[140px] p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ${color || 'bg-gray-100'}`}>
                    {/* Placeholder for actual logo logic */}
                    <div className="w-full h-full relative">
                        {/* In a real app, use NextImage with proper src */}
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                            {/* Fallback if no image */}
                            {!logo && symbol[0]}
                        </div>
                        {logo && <Image src={logo} alt={symbol} fill className="object-cover" />}
                    </div>
                </div>
            </div>
            <div>
                <h4 className="font-bold text-lg">{symbol}</h4>
                <p className="text-xs text-gray-500 mb-2">{name}</p>
                <p className="font-semibold text-sm">{price}</p>
            </div>
        </div>
    );
}
