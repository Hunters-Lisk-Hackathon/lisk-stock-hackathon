
"use client";

import { X, Loader2 } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useAccount } from "wagmi";
import Image from "next/image";

export function PortfolioSummary() {
    const { isConnected } = useAccount();
    const { idrx, portfolioValue, isLoading } = usePortfolio();

    const formatBalance = (balance: string) => {
        const num = parseFloat(balance);
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(num);
    };

    if (!isConnected) {
        return (
            <div className="py-6">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>

                    <h3 className="text-white/60 font-medium mb-1 relative z-10">Total Balance</h3>
                    <div className="text-3xl font-bold tracking-tight mb-6 relative z-10">
                        Rp 0
                    </div>

                    <div className="flex items-center gap-3 relative z-10 opacity-50">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                            <X className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-white/60">IDRX Balance</p>
                            <p className="font-medium">Connect Wallet</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6">
            <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/30 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-500/30 transition-colors duration-500"></div>

                <div className="relative z-10">
                    <h3 className="text-white/70 font-medium mb-2 flex items-center gap-2">
                        Total Portfolio Value
                        <span className="px-2 py-0.5 bg-green-500/20 rounded-full text-[10px] text-green-400 backdrop-blur-sm border border-green-500/20">
                            +2.4%
                        </span>
                    </h3>
                    <div className="text-4xl font-bold tracking-tight mb-8">
                        {isLoading ? (
                            <div className="h-10 w-48 bg-white/10 rounded animate-pulse"></div>
                        ) : (
                            `Rp ${formatBalance(portfolioValue.toString())} `
                        )}
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-900/50 relative overflow-hidden">
                            <Image
                                src="/images/idrx.png"
                                alt="IDRX"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                        <div>
                            <p className="text-xs text-white/60 mb-0.5">Available to Trade</p>
                            {isLoading ? (
                                <div className="h-5 w-24 bg-white/10 rounded animate-pulse"></div>
                            ) : (
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold">{formatBalance(idrx.formattedBalance)}</span>
                                    <span className="text-xs font-medium text-blue-400">IDRX</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
