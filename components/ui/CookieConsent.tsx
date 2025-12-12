"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consented = localStorage.getItem("bytechlabs-consent");
        if (!consented) {
            // Small delay for smooth entrance
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("bytechlabs-consent", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100%-3rem)]"
                >
                    <div className="bg-[#111] border border-[#333] p-6 shadow-2xl backdrop-blur-md bg-opacity-95">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-serif text-[#e5e5e5] text-lg">Cookie Notice</h3>
                            <p className="font-mono text-xs text-[#888] leading-relaxed">
                                We use cookies to enhance your experience and analyze our traffic.
                                By continuing to accept, you agree to our use of cookies for these purposes.
                            </p>
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={handleAccept}
                                    className="px-4 py-2 bg-[#e5e5e5] text-black font-mono text-xs font-bold hover:bg-white transition-colors"
                                >
                                    ACCEPT ALL
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-4 py-2 border border-[#333] text-[#666] font-mono text-xs hover:border-[#666] hover:text-[#e5e5e5] transition-colors"
                                >
                                    NECESSARY ONLY
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
