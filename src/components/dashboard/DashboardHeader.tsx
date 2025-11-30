"use client";

import { Bell, Wallet } from "lucide-react";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function DashboardHeader() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    const handleWalletClick = () => {
        if (isConnected) {
            disconnect();
        } else {
            // Connect with first available connector (injected wallet)
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
        <header className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3 md:hidden">
                {isConnected && address ? (
                    <>
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gradient-to-br from-blue-500 to-purple-600">
                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                                {address.slice(2, 4).toUpperCase()}
                            </div>
                        </div>
                        <div>
                            <h2 className="font-semibold text-sm">{shortenAddress(address)}</h2>
                            <p className="text-xs text-gray-500">Lisk Sepolia</p>
                        </div>
                    </>
                ) : (
                    <button
                        onClick={handleWalletClick}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        <Wallet className="w-4 h-4" />
                        Connect Wallet
                    </button>
                )}
            </div>
            <div className="hidden md:block">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
                {/* Desktop wallet button */}
                <div className="hidden md:block">
                    {isConnected && address ? (
                        <button
                            onClick={handleWalletClick}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                                {address.slice(2, 4).toUpperCase()}
                            </div>
                            {shortenAddress(address)}
                        </button>
                    ) : (
                        <button
                            onClick={handleWalletClick}
                            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            <Wallet className="w-4 h-4" />
                            Connect Wallet
                        </button>
                    )}
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                    <Bell className="w-6 h-6 text-gray-700" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>
    );
}
