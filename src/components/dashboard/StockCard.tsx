"use client";

import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/utils/format";

interface StockCardProps {
    symbol: string;
    name: string;
    price: string;
    logo: string;
    color?: string;
    ownedAmount?: number;
}

export function StockCard({ symbol, name, price, logo, color, ownedAmount = 0 }: StockCardProps) {
    return (
        <Link href={`/dashboard/buy/${symbol}`}>
            <div className="min-w-[160px] p-5 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden bg-white shadow-sm border border-gray-100`}>
                            <div className="w-full h-full relative">
                                {logo ? (
                                    <div className="absolute inset-2">
                                        <Image src={logo} alt={symbol} fill className="object-contain" />
                                    </div>
                                ) : (
                                    <div className={`absolute inset-0 flex items-center justify-center text-white font-bold text-sm ${color || 'bg-gray-100'}`}>
                                        {symbol[0]}
                                    </div>
                                )}
                            </div>
                        </div>
                        {ownedAmount > 0 && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full border border-green-200">
                                OWNED
                            </span>
                        )}
                    </div>

                    <div>
                        <h4 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{symbol}</h4>
                        <p className="text-xs text-gray-500 mb-3">{name}</p>

                        <div className="flex items-end justify-between">
                            <p className="font-bold text-sm">{price}</p>
                            {ownedAmount > 0 && (
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400">Balance</p>
                                    <p className="text-xs font-bold text-black">{formatNumber(ownedAmount)}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
