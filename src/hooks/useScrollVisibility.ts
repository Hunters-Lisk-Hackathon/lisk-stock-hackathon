import { useState, useEffect } from "react";

/**
 * Hook to track scroll visibility based on a threshold
 * @param threshold - Scroll position threshold in pixels (default: 300)
 * @returns boolean indicating if scrolled past threshold
 */
export function useScrollVisibility(threshold: number = 300): boolean {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > threshold);
        };

        // Initial check
        toggleVisibility();

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [threshold]);

    return isVisible;
}
