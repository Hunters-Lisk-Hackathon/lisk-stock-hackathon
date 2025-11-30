"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePortfolio } from "@/hooks/usePortfolio";
import { STOCKS } from "@/lib/contracts";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { formatNumber, parseNumber } from "@/utils/format";

export default function BuyPage() {
    const params = useParams();
    const router = useRouter();
    const symbol = params.symbol as string;
    const { idrx, buyStock, isLoading: isPortfolioLoading } = usePortfolio();

    const [displayAmount, setDisplayAmount] = useState("");
    const [rawValue, setRawValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const stock = STOCKS[symbol as keyof typeof STOCKS];

    if (!stock) {
        return <div className="p-6">Invalid stock symbol</div>;
    }

    const estimatedReceived = rawValue ? (parseFloat(rawValue) / stock.rate).toFixed(4) : "0";

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Allow only numbers and dots
        if (!/^[0-9.]*$/.test(val)) return;

        const parsed = parseNumber(val);
        setRawValue(parsed);

        if (parsed) {
            setDisplayAmount(formatNumber(parsed));
        } else {
            setDisplayAmount("");
        }
    };

    const handleBuy = async () => {
        if (!rawValue || parseFloat(rawValue) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        if (parseFloat(rawValue) > parseFloat(idrx.formattedBalance)) {
            setError("Insufficient IDRX balance");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            await buyStock(symbol, parseFloat(rawValue));
            setIsSuccess(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (err) {
            setError("Failed to buy stock. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
                <div className="fixed inset-0 w-full h-full bg-dot-grid z-0 pointer-events-none opacity-40"></div>
                <div className="fixed inset-0 w-full h-full bg-noise z-0 pointer-events-none mix-blend-multiply opacity-50"></div>

                <FadeIn>
                    <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-12 text-center shadow-2xl max-w-sm w-full border border-white/50 relative z-10">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-lg shadow-green-500/30 animate-bounce-subtle">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 tracking-tight">Purchase Successful!</h2>
                        <p className="text-gray-500 mb-8 text-lg">
                            You successfully bought <br />
                            <span className="text-black font-semibold">{estimatedReceived} {symbol}</span>
                        </p>
                        <div className="animate-pulse text-sm font-medium text-gray-400">Redirecting to dashboard...</div>
                    </div>
                </FadeIn>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 relative flex items-center justify-center">
            <div className="fixed inset-0 w-full h-full bg-dot-grid z-0 pointer-events-none opacity-40"></div>
            <div className="fixed inset-0 w-full h-full bg-noise z-0 pointer-events-none mix-blend-multiply opacity-50"></div>

            <div className="w-full max-w-lg px-4 relative z-10">
                <FadeIn>
                    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50">
                        <div className="p-8 md:p-10">
                            <div className="flex items-center justify-between mb-10">
                                <Link href="/dashboard" className="p-3 -ml-3 hover:bg-black/5 rounded-full transition-colors group">
                                    <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
                                </Link>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Buying</span>
                                    <h1 className="text-xl font-bold">{stock.name}</h1>
                                </div>
                            </div>

                            <div className="flex justify-center mb-10">
                                <div className="w-24 h-24 rounded-3xl bg-white shadow-xl border border-gray-100 p-4 flex items-center justify-center relative">
                                    {stock.logo ? (
                                        <div className="relative w-full h-full">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={stock.logo} alt={symbol} className="w-full h-full object-contain" />
                                        </div>
                                    ) : (
                                        <span className="text-2xl font-bold">{symbol[0]}</span>
                                    )}
                                    <div className="absolute -bottom-3 -right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                                        {symbol}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="text-center">
                                    <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
                                        Enter Amount (IDRX)
                                    </label>
                                    <div className="relative max-w-xs mx-auto">
                                        <input
                                            type="text"
                                            value={displayAmount}
                                            onChange={handleAmountChange}
                                            placeholder="0"
                                            className="w-full bg-transparent text-center text-5xl font-bold focus:outline-none placeholder:text-gray-200"
                                            autoFocus
                                        />
                                        <div className="h-px w-full bg-gray-200 mt-2"></div>
                                    </div>
                                    <div className="mt-4 text-sm text-gray-500 font-medium">
                                        Available: {formatNumber(idrx.formattedBalance)} IDRX
                                    </div>
                                </div>

                                <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-500 text-sm">Current Price</span>
                                        <span className="font-semibold">{formatNumber(stock.rate)} IDRX</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm">Estimated Received</span>
                                        <span className="font-bold text-lg text-blue-600">
                                            {estimatedReceived} {symbol}
                                        </span>
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm text-center bg-red-50 p-4 rounded-xl font-medium animate-shake">
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={handleBuy}
                                    disabled={isSubmitting || !rawValue}
                                    className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Confirm Purchase
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
