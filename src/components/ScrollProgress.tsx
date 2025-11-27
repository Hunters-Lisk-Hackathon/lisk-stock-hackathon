"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function ScrollProgress() {
    const scrollProgress = useMotionValue(0);
    const scaleX = useSpring(scrollProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    
    const rafRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = scrollHeight > 0 ? (scrolled / scrollHeight) : 0;
            scrollProgress.set(progress);
        };

        const handleScroll = () => {
            // Cancel previous frame
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            
            // Update on next frame
            rafRef.current = requestAnimationFrame(updateScrollProgress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        updateScrollProgress(); // Initial call

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [scrollProgress]);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-black/20 via-black to-black/20 origin-left z-[100]"
            style={{
                scaleX,
                willChange: "transform"
            }}
        />
    );
}
