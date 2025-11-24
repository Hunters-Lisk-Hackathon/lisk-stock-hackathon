"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";

type Step = {
    title: string;
    description: string;
};

type ScrollStepperProps = {
    steps: Step[];
};

export function ScrollStepper({ steps }: ScrollStepperProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const stepIndex = Math.min(
                Math.floor(latest * steps.length),
                steps.length - 1
            );
            setActiveStep(stepIndex);
        });

        return () => unsubscribe();
    }, [scrollYProgress, steps.length]);

    return (
        <div ref={containerRef} className="space-y-12 md:space-y-20">
            {steps.map((step, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative pl-6 md:pl-10"
                >
                    {/* Left Accent Bar */}
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                        animate={{
                            backgroundColor: index <= activeStep ? "#000" : "rgba(0,0,0,0.1)",
                        }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* Step Number Badge */}
                    <motion.div
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 md:mb-4 border"
                        animate={{
                            borderColor: index <= activeStep ? "#000" : "rgba(0,0,0,0.15)",
                            backgroundColor: index <= activeStep ? "#000" : "transparent",
                            color: index <= activeStep ? "#fff" : "rgba(0,0,0,0.4)",
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl md:text-3xl font-bold tracking-tight mb-2 md:mb-3">
                        {step.title}
                    </h3>
                    <p className="text-black/60 text-base md:text-lg leading-relaxed max-w-2xl">
                        {step.description}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
