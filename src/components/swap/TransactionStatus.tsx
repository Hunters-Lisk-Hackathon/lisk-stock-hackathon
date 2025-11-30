"use client";

import { CheckCircle, XCircle, Loader2, ExternalLink } from "lucide-react";

interface TransactionStatusProps {
    status: "idle" | "approving" | "swapping" | "success" | "error";
    txHash?: string | null;
    error?: string | null;
}

export function TransactionStatus({ status, txHash, error }: TransactionStatusProps) {
    const explorerUrl = txHash
        ? `https://sepolia-blockscout.lisk.com/tx/${txHash}`
        : null;

    if (status === "approving") {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-16 h-16 animate-spin text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Approving IDRX...</h3>
                <p className="text-gray-500 text-center">
                    Please confirm the approval transaction in your wallet
                </p>
            </div>
        );
    }

    if (status === "swapping") {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-16 h-16 animate-spin text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Swapping...</h3>
                <p className="text-gray-500 text-center">
                    Please confirm the swap transaction in your wallet
                </p>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Swap Successful!</h3>
                <p className="text-gray-500 text-center mb-4">
                    Your stock tokens have been purchased
                </p>
                {explorerUrl && (
                    <a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        View on Explorer
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <XCircle className="w-16 h-16 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Transaction Failed</h3>
                <p className="text-red-600 text-center">{error || "An error occurred"}</p>
            </div>
        );
    }

    return null;
}
