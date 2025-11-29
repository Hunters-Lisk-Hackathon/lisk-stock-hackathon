"use client";

import { Home, Repeat, FileText } from "lucide-react";
import Link from "next/link";

export function BottomNav() {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border border-gray-100 px-6 py-3 flex items-center gap-8 z-50 md:hidden">
            <Link href="/dashboard" className="flex flex-col items-center gap-1 text-black">
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-medium">Home</span>
            </Link>
            <div className="relative -top-8">
                <button className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform">
                    <Repeat className="w-6 h-6" />
                </button>
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap">Trade</span>
            </div>
            <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-black transition-colors">
                <FileText className="w-6 h-6" />
                <span className="text-[10px] font-medium">History</span>
            </Link>
        </div>
    );
}
