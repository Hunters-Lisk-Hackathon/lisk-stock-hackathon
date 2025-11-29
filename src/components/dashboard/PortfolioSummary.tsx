"use client";

import { X } from "lucide-react";

export function PortfolioSummary() {
    return (
        <div className="py-6">
            <h3 className="text-gray-500 font-medium mb-1">Portfolio</h3>
            <div className="text-4xl font-bold tracking-tight mb-6">
                Rp 203.000.999
            </div>

            <div className="flex items-center gap-2 mb-2">
                <h4 className="text-gray-500 font-medium">IDRX Balance</h4>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    X
                </div>
                <span className="text-2xl font-medium">15.000 <span className="font-bold">IDRX</span></span>
            </div>
        </div>
    );
}
