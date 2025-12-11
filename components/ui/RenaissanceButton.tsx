import React from "react";
import { motion } from "framer-motion";

interface RenaissanceButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
}

/**
 * RenaissanceButton - Beautiful button with Da Vinci aesthetic
 * Ornamental borders, elegant typography, subtle interactions
 */
export function RenaissanceButton({
    children,
    onClick,
    variant = "primary",
    className = ""
}: RenaissanceButtonProps) {

    const baseStyles = "relative group px-12 py-6 font-serif text-base tracking-wide transition-all duration-300";

    const variantStyles = {
        primary: "bg-transparent border-2 border-charcoal dark:border-off-white text-charcoal dark:text-off-white",
        secondary: "bg-charcoal/5 dark:bg-off-white/5 border border-charcoal/20 dark:border-off-white/20 text-charcoal dark:text-off-white",
        outline: "bg-transparent border border-charcoal/30 dark:border-off-white/30 text-charcoal/70 dark:text-off-white/70"
    };

    return (
        <motion.button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Corner ornaments */}
            <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-current opacity-40 group-hover:opacity-70 transition-opacity" />
            <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-current opacity-40 group-hover:opacity-70 transition-opacity" />
            <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-current opacity-40 group-hover:opacity-70 transition-opacity" />
            <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-current opacity-40 group-hover:opacity-70 transition-opacity" />

            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-3">
                {children}
            </span>

            {/* Hover underline effect */}
            <motion.span
                className="absolute bottom-2 left-1/2 h-px bg-current"
                initial={{ width: 0, x: "-50%" }}
                whileHover={{ width: "60%" }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
}
