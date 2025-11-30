"use client";

import { Home, Repeat, FileText, Settings, LogOut, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Sidebar() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    const handleWalletClick = () => {
        if (isConnected) {
            disconnect();
        } else {
            const connector = connectors[0];
            if (connector) {
                connect({ connector });
            }
        }
    };

    const shortenAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-100 p-6 z-50">
            <div className="mb-10 px-2">
                <Link href="/" className="relative w-32 h-10 block hover:opacity-80 transition-opacity">
                    <Image
                        src="/images/stako-logo-transparent.png"
                        alt="Stako Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>
            </div>

            <nav className="flex-1 space-y-2">
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded-xl transition-colors">
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Home</span>
                </Link>
                <div className="group relative">
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-xl transition-colors cursor-not-allowed">
                        <Repeat className="w-5 h-5" />
                        <span className="font-medium">Trade</span>
                    </Link>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        SOON
                    </span>
                </div>
                <div className="group relative">
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-xl transition-colors cursor-not-allowed">
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">History</span>
                    </Link>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        SOON
                    </span>
                </div>
                <div className="group relative">
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-xl transition-colors cursor-not-allowed">
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                    </Link>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        SOON
                    </span>
                </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100">
                {isConnected && address ? (
                    <>
                        <div className="flex items-center gap-3 px-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {address.slice(2, 4).toUpperCase()}
                            </div>
                            <div className="overflow-hidden flex-1">
                                <h4 className="font-semibold text-sm truncate">{shortenAddress(address)}</h4>
                                <p className="text-xs text-gray-500 truncate">Lisk Sepolia</p>
                            </div>
                        </div>
                        <button
                            onClick={handleWalletClick}
                            className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl w-full transition-colors text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Disconnect
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleWalletClick}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl w-full transition-colors text-sm font-medium hover:bg-gray-800"
                    >
                        <Wallet className="w-4 h-4" />
                        Connect Wallet
                    </button>
                )}
            </div>
        </aside>
    );
}
