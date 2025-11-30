"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { CONTRACT_ADDRESSES } from "@/lib/contracts";
import { TransactionStatus } from "./TransactionStatus";

interface SwapInterfaceProps {
    stockSymbol: string;
    stockName: string;
    stockAddress: `0x${string}`;
    exchangeRate: number;
    onSwapComplete?: () => void;
}

export function SwapInterface({
    stockSymbol,
    stockName,
    stockAddress,
    exchangeRate,
    onSwapComplete,
}: SwapInterfaceProps) {
    const { address, isConnected } = useAccount();
    const [idrxAmount, setIdrxAmount] = useState("");
    const [status, setStatus] = useState<"idle" | "approving" | "swapping" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState<string | null>(null);

    const { formattedBalance: idrxBalance, refetch } = useTokenBalance(CONTRACT_ADDRESSES.IDRX);

    const calculateStockAmount = () => {
        if (!idrxAmount || isNaN(parseFloat(idrxAmount))) return "0";
        const amount = parseFloat(idrxAmount) / exchangeRate;
        return amount.toFixed(6);
    };

    const handleSwap = async () => {
        if (!isConnected || !address) {
            setError("Please connect your wallet");
            return;
        }

        if (!idrxAmount || parseFloat(idrxAmount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        if (parseFloat(idrxAmount) > parseFloat(idrxBalance)) {
            setError("Insufficient IDRX balance");
            return;
        }

        try {
            setStatus("approving");
            setError(null);

            // Import wagmi hooks here to use them
            const { writeContract } = await import("wagmi/actions");
            const { config } = await import("@/lib/wagmi-config");
            const { ERC20_ABI, ROUTER_ABI } = await import("@/lib/contracts");

            const amountWei = parseUnits(idrxAmount, 18);

            // First approve
            const approveHash = await writeContract(config, {
                address: CONTRACT_ADDRESSES.IDRX,
                abi: ERC20_ABI,
                functionName: "approve",
                args: [CONTRACT_ADDRESSES.ROUTER, amountWei],
            });

            // Wait a bit for approval
            await new Promise((resolve) => setTimeout(resolve, 3000));

            setStatus("swapping");

            // Then swap
            const swapHash = await writeContract(config, {
                address: CONTRACT_ADDRESSES.ROUTER,
                abi: ROUTER_ABI,
                functionName: "swapIDRXForStock",
                args: [stockAddress, amountWei],
            });

            setTxHash(swapHash);
            setStatus("success");
            setIdrxAmount("");

            // Refetch balances
            setTimeout(() => {
                refetch();
                onSwapComplete?.();
            }, 2000);
        } catch (err: any) {
            console.error("Swap error:", err);
            setStatus("error");
            setError(err.message || "Transaction failed");
        }
    };

    if (!isConnected) {
        return (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
                <p className="text-gray-500 mb-4">Please connect your wallet to buy {stockSymbol}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Buy {stockSymbol}</h2>

            {/* Input Section */}
            <div className="space-y-4 mb-6">
                {/* IDRX Input */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-500">You Pay</label>
                        <span className="text-xs text-gray-400">
                            Balance: {parseFloat(idrxBalance).toFixed(2)} IDRX
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            value={idrxAmount}
                            onChange={(e) => setIdrxAmount(e.target.value)}
                            placeholder="0.00"
                            className="flex-1 bg-transparent text-2xl font-bold outline-none"
                            disabled={status !== "idle"}
                        />
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                X
                            </div>
                            <span className="font-bold">IDRX</span>
                        </div>
                    </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-gray-600 rotate-90" />
                    </div>
                </div>

                {/* Stock Output */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-500">You Receive</label>
                        <span className="text-xs text-gray-400">
                            Rate: 1 {stockSymbol} = {exchangeRate} IDRX
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 text-2xl font-bold text-gray-700">
                            {calculateStockAmount()}
                        </div>
                        <span className="font-bold">{stockSymbol}</span>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {/* Action Button */}
            {status === "idle" ? (
                <button
                    onClick={handleSwap}
                    disabled={!idrxAmount || parseFloat(idrxAmount) <= 0}
                    className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            ) : (
                <TransactionStatus status={status} txHash={txHash} error={error} />
            )}

            {/* Reset on Success */}
            {status === "success" && (
                <button
                    onClick={() => {
                        setStatus("idle");
                        setTxHash(null);
                        setError(null);
                    }}
                    className="w-full mt-4 py-3 border-2 border-black text-black rounded-full font-bold hover:bg-gray-50 transition-colors"
                >
                    Make Another Purchase
                </button>
            )}
        </div>
    );
}
