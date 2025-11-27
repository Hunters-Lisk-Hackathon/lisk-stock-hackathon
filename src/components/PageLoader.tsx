"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const loadingMessages = [
  "Initializing Protocol...",
  "Loading Markets...",
  "Syncing Data...",
  "Almost Ready...",
];

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const progressRafRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressValue = useSpring(0, {
    stiffness: 80,
    damping: 20,
    mass: 0.4,
  });

  useEffect(() => {
    const startTime = performance.now();
    const duration = 3600;

    const animateProgress = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const targetProgress = Math.min((elapsed / duration) * 100, 100);

      progressValue.set(targetProgress);

      if (targetProgress < 100) {
        progressRafRef.current = requestAnimationFrame(animateProgress);
      } else if (!hideTimeoutRef.current) {
        hideTimeoutRef.current = setTimeout(() => setIsLoading(false), 600);
      }
    };

    progressRafRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (progressRafRef.current) {
        cancelAnimationFrame(progressRafRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [progressValue]);

  useMotionValueEvent(progressValue, "change", (latest) => {
    const next = Math.min(100, Math.max(0, Math.floor(latest)));
    setDisplayedProgress((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    const rotateMessages = () => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      messageTimeoutRef.current = setTimeout(rotateMessages, 1200);
    };

    messageTimeoutRef.current = setTimeout(rotateMessages, 1200);

    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = useTransform(progressValue, (value) => {
    return circumference - (value / 100) * circumference;
  });

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
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-slate-50"></div>

          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(0, 0, 0, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.04) 0%, transparent 50%)",
              backgroundSize: "200% 200%",
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Circular Progress Ring */}
            <div className="relative mb-8">
              {/* Background Ring */}
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-black/5"
                />
                {/* Progress Ring */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  className="text-black"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                  }}
                />
              </svg>

              {/* Logo in Center with Shimmer */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <h1 className="text-5xl font-bold tracking-tighter text-gradient relative">
                    KR4
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1,
                      }}
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
              {displayedProgress}%
            </motion.p>
          </div>

          {displayedProgress > 80 && (
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
