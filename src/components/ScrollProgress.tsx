"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const maxScrollable = Math.max(scrollHeight, 1);
      const scrolled = Math.min(Math.max(window.scrollY, 0), scrollHeight);
      const progress = (scrolled / maxScrollable) * 100;
      setScrollProgress(progress);
      frameRef.current = null;
    };

    const requestUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(updateScrollProgress);
      }
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-black/20 via-black to-black/20 origin-left z-[100]"
      style={{
        scaleX: scrollProgress / 100,
      }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    />
  );
}
