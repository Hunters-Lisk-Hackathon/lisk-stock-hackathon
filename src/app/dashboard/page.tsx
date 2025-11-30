import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PortfolioSummary } from "@/components/dashboard/PortfolioSummary";
import { ActionButtons } from "@/components/dashboard/ActionButtons";
import { StockList } from "@/components/dashboard/StockList";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { FadeIn } from "@/components/FadeIn";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-0 md:pl-64 relative">
            <div className="fixed inset-0 w-full h-full bg-dot-grid z-0 pointer-events-none opacity-40"></div>
            <div className="fixed inset-0 w-full h-full bg-noise z-0 pointer-events-none mix-blend-multiply opacity-50"></div>
            <Sidebar />

            <div className="max-w-md mx-auto md:max-w-7xl md:mx-0 md:px-8 min-h-screen md:min-h-0 overflow-hidden md:overflow-visible relative z-10">
                <div className="px-6 md:px-0 py-4 md:py-8">
                    <FadeIn delay={0.1}>
                        <DashboardHeader />
                    </FadeIn>

                    <div className="md:grid md:grid-cols-12 md:gap-8">
                        <div className="md:col-span-12 lg:col-span-8">
                            <div className="md:flex md:items-center md:justify-between md:mb-8">
                                <FadeIn delay={0.2}>
                                    <PortfolioSummary />
                                </FadeIn>
                                <div className="hidden md:block">
                                    <FadeIn delay={0.3}>
                                        <ActionButtons />
                                    </FadeIn>
                                </div>
                            </div>

                            <div className="md:hidden">
                                <FadeIn delay={0.3}>
                                    <ActionButtons />
                                </FadeIn>
                            </div>

                            <FadeIn delay={0.4}>
                                <StockList />
                            </FadeIn>
                        </div>

                        {/* Right Column for Desktop */}
                        <div className="hidden lg:block lg:col-span-4">
                            <FadeIn delay={0.5} className="h-full">
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 h-full shadow-sm">
                                    <h3 className="font-bold text-lg mb-4">Market News</h3>
                                    <p className="text-gray-500 text-sm">No recent news.</p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
                <BottomNav />
            </div>
        </div>
    );
}
