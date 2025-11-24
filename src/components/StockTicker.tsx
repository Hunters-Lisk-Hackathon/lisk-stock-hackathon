"use client";

import { motion } from "framer-motion";

const stocks = [
    { symbol: "AAPL", price: "182.50", change: "+1.2%", up: true },
    { symbol: "TSLA", price: "240.10", change: "-0.5%", up: false },
    { symbol: "NVDA", price: "485.90", change: "+2.8%", up: true },
    { symbol: "MSFT", price: "370.20", change: "+0.9%", up: true },
    { symbol: "GOOGL", price: "138.40", change: "-0.2%", up: false },
    { symbol: "AMZN", price: "145.80", change: "+1.5%", up: true },
    { symbol: "COIN", price: "155.60", change: "+4.2%", up: true },
    { symbol: "MSTR", price: "590.00", change: "+5.1%", up: true },
];

export function StockTicker() {
    return (
        <div className="w-full bg-black/5 border-y border-black/5 overflow-hidden py-2 flex items-center">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-8 px-4"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    {[...stocks, ...stocks, ...stocks, ...stocks].map((stock, i) => (
                        <div key={i} className="flex items-center gap-2 text-[13px] md:text-sm font-medium">
                            <span className="text-black/80">{stock.symbol}</span>
                            <span className="text-black/60">${stock.price}</span>
                            <span className={stock.up ? "text-green-600" : "text-red-500"}>
                                {stock.change}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
