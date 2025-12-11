import React from "react";
import { motion } from "framer-motion";

interface TechnicalAnnotationProps {
    left?: string;
    right?: string;
    className?: string;
}

/**
 * TechnicalAnnotation - Reusable ornamental divider
 * Used for section headers and technical labels
 */
export function TechnicalAnnotation({ left, right, className = "" }: TechnicalAnnotationProps) {
    return (
        <div className={`flex items-center justify-between ornament ${className}`}>
            {left && (
                <div className="font-mono text-[10px] uppercase tracking-widest text-charcoal/40 dark:text-off-white/40">
                    {left}
                </div>
            )}
            <div className="h-px flex-1 mx-4 bg-charcoal/10 dark:bg-off-white/10" />
            {right && (
                <div className="font-mono text-[10px] uppercase tracking-widest text-charcoal/40 dark:text-off-white/40">
                    {right}
                </div>
            )}
        </div>
    );
}

interface CornerReferenceProps {
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    label: string;
}

/**
 * CornerReference - Reusable corner ornament
 * Purely decorative, no hover effects
 */
export function CornerReference({ position, label }: CornerReferenceProps) {
    const positionClasses = {
        "top-left": "top-8 left-8",
        "top-right": "top-8 right-8",
        "bottom-left": "bottom-8 left-8",
        "bottom-right": "bottom-8 right-8"
    };

    const borderClasses = {
        "top-left": "border-t-2 border-l-2",
        "top-right": "border-t-2 border-r-2",
        "bottom-left": "border-b-2 border-l-2",
        "bottom-right": "border-b-2 border-r-2"
    };

    const labelPosition = position.includes("right") ? "order-first" : "";

    return (
        <div className={`absolute ${positionClasses[position]} ornament`}>
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 ${borderClasses[position]} border-charcoal/20 dark:border-off-white/20`} />
                <span className={`font-mono text-[9px] text-charcoal/30 dark:text-off-white/30 tracking-wider ${labelPosition}`}>
                    {label}
                </span>
            </div>
        </div>
    );
}

interface MeasurementLineProps {
    orientation?: "horizontal" | "vertical";
    length?: string;
    className?: string;
}

/**
 * MeasurementLine - Reusable technical divider line
 */
export function MeasurementLine({ orientation = "horizontal", length = "w-32", className = "" }: MeasurementLineProps) {
    const lineClass = orientation === "horizontal" ? "h-px" : "w-px h-32";
    const widthClass = orientation === "horizontal" ? length : "";

    return (
        <div className={`${lineClass} ${widthClass} bg-charcoal/10 dark:bg-off-white/10 ${className}`} />
    );
}
