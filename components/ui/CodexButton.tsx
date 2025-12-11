import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CodexButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
    onClick?: () => void;
    href?: string;
}

/**
 * Codex Leicester themed button - DARK THEME ONLY
 */
export function CodexButton({
    children,
    variant = "primary",
    size = "md",
    className,
    onClick,
    href,
}: CodexButtonProps) {
    const baseStyles = "relative inline-flex items-center justify-center font-mono uppercase tracking-widest transition-all rounded-sm";

    const variantStyles = {
        primary: "bg-off-white/5 border-2 border-off-white/20 text-off-white hover:bg-off-white/10",
        secondary: "border-2 border-red-ink/30 text-red-ink hover:bg-red-ink/5",
        ghost: "text-off-white/70 hover:text-off-white",
    };

    const sizeStyles = {
        sm: "px-8 py-4 text-xs gap-2 sm:px-10 sm:py-5 sm:gap-3",
        md: "px-10 py-5 text-sm gap-3 sm:px-12 sm:py-6 sm:gap-4",
        lg: "px-12 py-6 text-sm gap-3 sm:px-16 sm:py-8 sm:text-base sm:gap-4",
    };

    const Component = href ? motion.a : motion.button;
    const props = href ? { href } : { onClick };

    return (
        <Component
            className={cn(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {/* Corner ornaments */}
            <span className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-current opacity-40" />
            <span className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-current opacity-40" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-current opacity-40" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-current opacity-40" />

            {children}
        </Component>
    );
}
