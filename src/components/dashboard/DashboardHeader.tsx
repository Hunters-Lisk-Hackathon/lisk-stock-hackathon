"use client";

import { Bell } from "lucide-react";
import Image from "next/image";

export function DashboardHeader() {
    return (
        <header className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3 md:hidden">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                    <Image
                        src="/images/avatar-placeholder.png"
                        alt="User Avatar"
                        fill
                        className="object-cover"
                        onError={(e) => {
                            // Fallback if image fails
                            e.currentTarget.src = "https://ui-avatars.com/api/?name=Alexia+Putellas&background=random";
                        }}
                    />
                </div>
                <div>
                    <h2 className="font-semibold text-sm">Alexia Putellas (0x223...ooi)</h2>
                    <p className="text-xs text-gray-500">Lisk Ecosystem</p>
                </div>
            </div>
            <div className="hidden md:block">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
        </header>
    );
}
