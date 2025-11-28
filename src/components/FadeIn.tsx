"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { SCROLL, ANIMATION } from "@/lib/constants";
import type { FadeInProps } from "@/types";

export function FadeIn({
    children,
    className,
    delay = 0,
    direction = "up",
    scale,
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: SCROLL.fadeInMargin });

    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                scale: scale || 1,
                ...directionOffset[direction],
            }}
            animate={
                isInView
                    ? {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                    }
                    : {
                        opacity: 0,
                        scale: scale || 1,
                        ...directionOffset[direction],
                    }
            }
            transition={{
                duration: ANIMATION.durations.slow,
                delay: delay,
                ease: ANIMATION.easing.bounce,
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
