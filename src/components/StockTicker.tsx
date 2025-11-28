"use client";

import { motion } from "framer-motion";
import { STOCK_TICKER_DATA } from "@/lib/constants";

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
                    {[...STOCK_TICKER_DATA, ...STOCK_TICKER_DATA, ...STOCK_TICKER_DATA, ...STOCK_TICKER_DATA].map((stock, i) => (
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
