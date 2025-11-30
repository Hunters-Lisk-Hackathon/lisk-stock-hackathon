"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SwapInterface } from "@/components/swap/SwapInterface";
import { STOCKS } from "@/lib/contracts";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { BottomNav } from "@/components/dashboard/BottomNav";

export default function BuyStockPage() {
    const params = useParams();
    const router = useRouter();
    const symbol = params.symbol as string;

    // Get stock data
    const stockData = STOCKS[symbol as keyof typeof STOCKS];

    if (!stockData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Stock Not Found</h1>
                    <p className="text-gray-500 mb-4">The stock {symbol} is not available</p>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-0 md:pl-64">
            <Sidebar />

            <div className="max-w-md mx-auto md:max-w-4xl md:mx-0 md:px-8 bg-white md:bg-transparent min-h-screen md:min-h-0 shadow-2xl md:shadow-none overflow-hidden md:overflow-visible relative">
                <div className="px-6 md:px-0 py-4 md:py-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Buy {stockData.name}</h1>
                            <p className="text-gray-500">{stockData.symbol}</p>
                        </div>
                    </div>

                    {/* Stock Info Card */}
                    <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-16 h-16 rounded-full ${stockData.color} flex items-center justify-center text-white font-bold text-2xl`}>
                                {stockData.symbol[0]}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{stockData.symbol}</h2>
                                <p className="text-gray-600">{stockData.name}</p>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">{stockData.rate}</span>
                            <span className="text-gray-500">IDRX per token</span>
                        </div>
                    </div>

                    {/* Swap Interface */}
                    <SwapInterface
                        stockSymbol={stockData.symbol}
                        stockName={stockData.name}
                        stockAddress={stockData.address as `0x${string}`}
                        exchangeRate={stockData.rate}
                        onSwapComplete={() => {
                            // Could add analytics or notifications here
                            console.log("Swap completed!");
                        }}
                    />
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
