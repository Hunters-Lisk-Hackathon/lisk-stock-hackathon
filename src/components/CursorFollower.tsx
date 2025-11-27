"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const visibilityRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const latestMouse = useRef({ x: 0, y: 0 });

  const dotX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const dotY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const ringX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    const flushAnimationFrame = () => {
      const { x, y } = latestMouse.current;
      dotX.set(x - 4);
      dotY.set(y - 4);
      ringX.set(x - 16);
      ringY.set(y - 16);
      frameRef.current = null;
    };

    const updateMousePosition = (event: MouseEvent) => {
      latestMouse.current = { x: event.clientX, y: event.clientY };

      if (!visibilityRef.current) {
        visibilityRef.current = true;
        setIsVisible(true);
      }

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(flushAnimationFrame);
      }
    };

    const handleMouseLeave = () => {
      visibilityRef.current = false;
      setIsVisible(false);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{ x: dotX, y: dotY }}
      >
        <div className="h-2 w-2 rounded-full bg-black/30" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed z-[9997] hidden md:block"
        style={{ x: ringX, y: ringY }}
      >
        <div className="h-8 w-8 rounded-full border border-black/20" />
      </motion.div>
    </>
  );
}
