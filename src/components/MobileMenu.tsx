"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const menuLinks = [
        { label: "Markets", href: "#markets" },
        { label: "Governance", href: "#governance" },
        { label: "Developers", href: "#developers" },
    ];

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center z-50 relative"
                aria-label="Toggle menu"
            >
                <span className="w-full h-0.5 bg-black block" />
                <span className="w-full h-0.5 bg-black block" />
                <span className="w-full h-0.5 bg-black block" />
            </button>

            {/* Portal for Menu Overlay */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
                                onClick={closeMenu}
                            />

                            {/* Sidebar */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                                className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[9999] flex flex-col"
                            >
                                {/* Header with Close Button */}
                                <div className="flex items-center justify-between p-6 border-b border-black/10">
                                    <div className="text-lg font-bold tracking-tighter">Menu</div>
                                    <button
                                        onClick={closeMenu}
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15 5L5 15M5 5L15 15"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex-1 flex flex-col py-4 overflow-y-auto">
                                    {menuLinks.map((link, index) => (
                                        <motion.div
                                            key={link.label}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 + 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={closeMenu}
                                                className="block py-4 px-6 text-base font-medium text-black/70 hover:text-black hover:bg-black/5 transition-colors border-b border-black/5 last:border-0"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Launch App Button */}
                                <div className="p-6 border-t border-black/10 bg-white">
                                    <Link
                                        href="https://dclex-dex.netlify.app/"
                                        onClick={closeMenu}
                                        className="block w-full py-3 px-4 bg-black text-white text-center text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
                                    >
                                        Launch App
                                    </Link>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
