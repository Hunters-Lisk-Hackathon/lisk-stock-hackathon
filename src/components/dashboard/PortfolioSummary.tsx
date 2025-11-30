"use client";

import { X, Loader2 } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useAccount } from "wagmi";

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
                <h3 className="text-gray-500 font-medium mb-1">Portfolio</h3>
                <div className="text-2xl font-bold tracking-tight mb-6 text-gray-400">
                    Connect wallet to view
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-gray-500 font-medium">IDRX Balance</h4>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        X
                    </div>
                    <span className="text-xl font-medium text-gray-400">-- <span className="font-bold">IDRX</span></span>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6">
            <h3 className="text-gray-500 font-medium mb-1">Portfolio</h3>
            <div className="text-4xl font-bold tracking-tight mb-6">
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        <span className="text-gray-400">Loading...</span>
                    </div>
                ) : (
                    `Rp ${formatBalance(portfolioValue.toString())}`
                )}
            </div>

            <div className="flex items-center gap-2 mb-2">
                <h4 className="text-gray-500 font-medium">IDRX Balance</h4>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    X
                </div>
                {isLoading ? (
                    <span className="text-xl font-medium text-gray-400">Loading...</span>
                ) : (
                    <span className="text-2xl font-medium">
                        {formatBalance(idrx.formattedBalance)} <span className="font-bold">IDRX</span>
                    </span>
                )}
            </div>
        </div>
    );
}
