"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
  "Initializing Protocol...",
  "Loading Markets...",
  "Syncing Data...",
  "Almost Ready...",
];

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000; // 3 seconds

    let rafId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        rafId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    rafId = requestAnimationFrame(animate);

    // Rotating messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1200);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(messageInterval);
    };
  }, []);

  const circumference = 2 * Math.PI * 75;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-slate-50" />

          {/* Optimized background gradient - static positioning */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(0, 0, 0, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.04) 0%, transparent 50%)",
            }}
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Circular Progress Ring */}
            <div className="relative mb-8">
              <svg
                className="w-52 h-52 transform -rotate-90"
                style={{ willChange: "auto" }}
              >
                {/* Background Ring */}
                <circle
                  cx="104"
                  cy="104"
                  r="75"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  className="text-black/5"
                />
                {/* Progress Ring - GPU accelerated */}
                <circle
                  cx="104"
                  cy="104"
                  r="75"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  className="text-black"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                    transition: "stroke-dashoffset 0.05s linear",
                    willChange: "stroke-dashoffset",
                  }}
                />
              </svg>

              {/* Logo in Center with optimized Shimmer */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ willChange: "transform" }}
                  className="relative"
                >
                  <h1 className="text-5xl font-bold tracking-tighter text-gradient relative">
                    Stako
                    {/* Shimmer Effect - optimized */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1.5,
                      }}
                      style={{ willChange: "transform" }}
                    />
                  </h1>
                </motion.div>
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-black/40 font-medium tracking-wider uppercase mb-4"
            >
              Tokenized Stock Protocol
            </motion.p>

            {/* Rotating Status Messages */}
            <div className="h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs text-black/30 font-medium"
                >
                  {loadingMessages[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-2xl font-bold tracking-tight text-black/80 font-mono"
            >
              {Math.floor(Math.min(progress, 100))}%
            </motion.p>
          </div>

          {progress > 80 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ willChange: "transform" }}
                className="text-black/30"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </motion.div>
              <motion.p
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-xs text-black/30 font-medium tracking-wider uppercase"
              >
                Ready
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
