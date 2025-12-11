import React from "react";
import { cn } from "@/lib/utils";

interface MuseumGlassProps {
    children: React.ReactNode;
    variant?: "light" | "dark" | "parchment";
    className?: string;
}

/**
 * MuseumGlass Component
 * 
 * Implements "Optical Glass" or "Museum Glass" styling - NOT standard glassmorphism.
 * Creates the effect of a microscope slide or magnifying glass over parchment.
 * 
 * Key Differences from Standard Glassmorphism:
 * - Low blur (4px) instead of heavy blur
 * - High transparency (10-40% opacity)
 * - Sharp 1px border (mimics glass slide edge)
 * - Tight shadow (shadow-sm) not diffused
 */
export function MuseumGlass({
    children,
    variant = "light",
    className
}: MuseumGlassProps) {
    const variantStyles = {
        light: "museum-glass",
        dark: "museum-glass-dark",
        parchment: "museum-glass-parchment",
    };

    return (
        <div className={cn(variantStyles[variant], className)}>
            {children}
        </div>
    );
}
