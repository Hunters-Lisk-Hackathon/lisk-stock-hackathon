"use client";

import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export function ActionButtons() {
    return (
        <div className="flex gap-4 py-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm active:scale-95 transition-transform">
                <ArrowDownCircle className="w-5 h-5" />
                Deposit
            </button>
            <button className="flex-1 bg-white border border-gray-200 text-blue-600 py-3 px-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm active:scale-95 transition-transform">
                <ArrowUpCircle className="w-5 h-5" />
                Withdraw
            </button>
        </div>
    );
}
