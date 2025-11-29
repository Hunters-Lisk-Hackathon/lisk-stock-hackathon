import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PortfolioSummary } from "@/components/dashboard/PortfolioSummary";
import { ActionButtons } from "@/components/dashboard/ActionButtons";
import { StockList } from "@/components/dashboard/StockList";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-0 md:pl-64">
            <Sidebar />

            <div className="max-w-md mx-auto md:max-w-7xl md:mx-0 md:px-8 bg-white md:bg-transparent min-h-screen md:min-h-0 shadow-2xl md:shadow-none overflow-hidden md:overflow-visible relative">
                <div className="px-6 md:px-0 py-4 md:py-8">
                    <DashboardHeader />

                    <div className="md:grid md:grid-cols-12 md:gap-8">
                        <div className="md:col-span-12 lg:col-span-8">
                            <div className="md:flex md:items-center md:justify-between md:mb-8">
                                <PortfolioSummary />
                                <div className="hidden md:block">
                                    <ActionButtons />
                                </div>
                            </div>

                            <div className="md:hidden">
                                <ActionButtons />
                            </div>

                            <StockList />
                        </div>

                        {/* Right Column for Desktop (Optional: News, Top Movers, etc.) - For now empty or could move Favorites here */}
                        <div className="hidden lg:block lg:col-span-4">
                            {/* Placeholder for future widgets */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full">
                                <h3 className="font-bold text-lg mb-4">Market News</h3>
                                <p className="text-gray-500 text-sm">No recent news.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomNav />
            </div>
        </div>
    );
}
