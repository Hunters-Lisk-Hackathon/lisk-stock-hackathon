"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Base timestamp - all calculations are based on elapsed time since this date
// This ensures all devices show the same value at the same time
const BASE_TIMESTAMP = new Date('2025-11-23T00:00:00Z').getTime();

const stats = [
    {
        label: "Total Volume",
        baseValue: 0,
        prefix: "$",
        suffix: "",
        decimals: 0,
        ticker: true,
        incrementPerSecond: 10 // Adds $10 per second
    },
    {
        label: "Active Users",
        baseValue: 0,
        prefix: "",
        suffix: "",
        decimals: 0,
        ticker: true,
        incrementPerSecond: 0.01 // Adds ~1 user per 100 seconds
    },
    {
        label: "Trade Latency",
        baseValue: 0.01,
        prefix: "< ",
        suffix: "s",
        decimals: 2,
        ticker: false
    },
    {
        label: "Assets Listed",
        baseValue: 150,
        prefix: "",
        suffix: "+",
        decimals: 0,
        ticker: false
    },
];

// Calculate current value based on elapsed time
const calculateTimeBasedValue = (baseValue: number, incrementPerSecond: number): number => {
    const now = Date.now();
    const elapsedSeconds = (now - BASE_TIMESTAMP) / 1000;
    return baseValue + (elapsedSeconds * incrementPerSecond);
};

export function AnimatedStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [liveValues, setLiveValues] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        if (!isInView) return;

        // Initial calculation
        const updateValues = () => {
            const newValues: { [key: number]: number } = {};
            stats.forEach((stat, index) => {
                if (stat.ticker && stat.incrementPerSecond !== undefined) {
                    newValues[index] = calculateTimeBasedValue(stat.baseValue, stat.incrementPerSecond);
                }
            });
            setLiveValues(newValues);
        };

        // Update immediately
        updateValues();

        // Update every 0.1 second for smooth animation (increments by 1 every 0.1s)
        const interval = setInterval(updateValues, 100);

        return () => clearInterval(interval);
    }, [isInView]);

    const formatNumber = (num: number, decimals: number) => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    };

    return (
        <div ref={ref} className="w-full py-12 border-b border-black/5 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2 font-mono">
                            {isInView ? (
                                stat.ticker ? (
                                    <span>
                                        {stat.prefix}
                                        {formatNumber(liveValues[index] ?? 0, stat.decimals)}
                                        {stat.suffix}
                                    </span>
                                ) : (
                                    <CountUp
                                        start={0}
                                        end={stat.baseValue}
                                        duration={2.5}
                                        separator=","
                                        decimals={stat.decimals}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                    />
                                )
                            ) : (
                                <span>{stat.prefix}0{stat.suffix}</span>
                            )}
                        </div>
                        <div className="text-sm font-medium text-black/40 uppercase tracking-wider">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
