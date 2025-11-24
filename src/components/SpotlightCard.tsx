"use client";

import { useRef, useState, MouseEvent } from "react";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
}

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        setIsHovered(false);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-3xl border transition-all duration-500 ${isHovered
                ? 'border-black/20 shadow-xl shadow-black/10 -translate-y-1 md:-translate-y-2 md:scale-[1.02]'
                : 'border-black/10 shadow-lg'
                } bg-white/50 backdrop-blur-md ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.08), transparent 40%)`,
                }}
            />

            {isHovered && (
                <div
                    className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.02), transparent 50%)`,
                    }}
                />
            )}

            <div className="relative h-full">{children}</div>
        </div>
    );
}
