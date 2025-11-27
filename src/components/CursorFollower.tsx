"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorFollower() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
    const ringX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });
    const ringY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });
    
    const rafRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;

        const updateMousePosition = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) setIsVisible(true);
            
            // Cancel previous frame
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            
            // Update on next frame
            rafRef.current = requestAnimationFrame(() => {
                cursorX.set(mouseX - 4);
                cursorY.set(mouseY - 4);
                ringX.set(mouseX - 16);
                ringY.set(mouseY - 16);
            });
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", updateMousePosition, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            document.removeEventListener("mouseleave", handleMouseLeave);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [isVisible, cursorX, cursorY, ringX, ringY]);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="pointer-events-none fixed z-[9998] hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <div className="h-2 w-2 rounded-full bg-black/30" />
            </motion.div>

            <motion.div
                className="pointer-events-none fixed z-[9997] hidden md:block"
                style={{
                    x: ringX,
                    y: ringY,
                }}
            >
                <div className="h-8 w-8 rounded-full border border-black/20" />
            </motion.div>
        </>
    );
}
