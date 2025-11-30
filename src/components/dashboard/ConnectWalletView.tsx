"use client";

import { Wallet } from "lucide-react";
import { useConnect } from "wagmi";
import { FadeIn } from "@/components/FadeIn";

export function ConnectWalletView() {
    const { connect, connectors } = useConnect();

    const handleConnect = () => {
        const connector = connectors[0];
        if (connector) {
            connect({ connector });
        }
    };

    return (
        <div className="py-12 md:py-20">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl p-8 md:p-16 text-center">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-pink-500/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-3xl mx-auto">
                    <FadeIn delay={0.1}>
                        <div className="w-24 h-24 mx-auto mb-8 relative group cursor-pointer" onClick={handleConnect}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20 blur-xl"></div>
                            <div className="relative w-full h-full bg-white rounded-3xl border border-gray-100 shadow-xl flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                                <Wallet className="w-10 h-10 text-black" />
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                            Start Your <br />
                            <span className="text-black">
                                Investment Journey
                            </span>
                        </h2>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
                            Connect your wallet to access tokenized real-world assets.
                            Secure, transparent, and built for everyone.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <button
                            onClick={handleConnect}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-900 transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-black/20"
                        >
                            <span>Connect Wallet</span>
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </button>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
