"use client";

import { Home, Repeat, FileText, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Sidebar() {
    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-100 p-6 z-50">
            <div className="mb-10 px-2">
                <div className="relative w-32 h-10">
                    <Image
                        src="/images/stako-logo-transparent.png"
                        alt="Stako Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded-xl transition-colors">
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Home</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-black rounded-xl transition-colors">
                    <Repeat className="w-5 h-5" />
                    <span className="font-medium">Trade</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-black rounded-xl transition-colors">
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">History</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-black rounded-xl transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                        <Image
                            src="/images/avatar-placeholder.png"
                            alt="User Avatar"
                            fill
                            className="object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "https://ui-avatars.com/api/?name=Alexia+Putellas&background=random";
                            }}
                        />
                    </div>
                    <div className="overflow-hidden">
                        <h4 className="font-semibold text-sm truncate">Alexia Putellas</h4>
                        <p className="text-xs text-gray-500 truncate">0x223...ooi</p>
                    </div>
                </div>
                <button className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl w-full transition-colors text-sm font-medium">
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
