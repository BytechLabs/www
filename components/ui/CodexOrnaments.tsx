import React from "react";
import { cn } from "@/lib/utils";

interface FolioNumberProps {
    number: string;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    className?: string;
}

/**
 * Folio number annotation - DARK THEME ONLY
 */
export function FolioNumber({ number, position = "top-right", className }: FolioNumberProps) {
    const positionStyles = {
        "top-left": "top-4 left-4",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-right": "bottom-4 right-4",
    };

    return (
        <div className={cn(
            "absolute font-mono text-xs text-off-white/40 italic select-none",
            positionStyles[position],
            className
        )}>
            Folio {number}
        </div>
    );
}

interface MarginAnnotationProps {
    text: string;
    position?: "left" | "right";
    className?: string;
}

/**
 * Margin annotation - DARK THEME ONLY
 */
export function MarginAnnotation({ text, position = "left", className }: MarginAnnotationProps) {
    return (
        <div className={cn(
            "absolute top-1/2 -translate-y-1/2 font-serif text-xs italic text-off-white/50 max-w-[120px] select-none",
            position === "left" ? "left-0 -translate-x-full pr-6 text-right" : "right-0 translate-x-full pl-6",
            className
        )}>
            {text}
        </div>
    );
}

interface MeasurementLineProps {
    orientation?: "horizontal" | "vertical";
    length?: string;
    className?: string;
}

/**
 * Measurement line - DARK THEME ONLY
 */
export function MeasurementLine({ orientation = "horizontal", length = "w-24", className }: MeasurementLineProps) {
    return (
        <div className={cn(
            "relative flex items-center gap-1 select-none",
            orientation === "vertical" && "flex-col",
            className
        )}>
            <span className={cn(
                "bg-off-white/20",
                orientation === "horizontal" ? "h-px" : "w-px h-12",
                orientation === "horizontal" && length
            )} />
            <span className={cn(
                "bg-off-white/20",
                orientation === "horizontal" ? "w-px h-2" : "h-px w-2"
            )} />
            <span className={cn(
                "bg-off-white/20",
                orientation === "horizontal" ? "h-px" : "w-px h-12",
                orientation === "horizontal" && length
            )} />
        </div>
    );
}

interface CornerReferenceProps {
    label: string;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    className?: string;
}

/**
 * Corner reference mark - DARK THEME ONLY
 */
export function CornerReference({ label, position = "top-left", className }: CornerReferenceProps) {
    const positionStyles = {
        "top-left": "top-0 left-0",
        "top-right": "top-0 right-0",
        "bottom-left": "bottom-0 left-0",
        "bottom-right": "bottom-0 right-0",
    };

    return (
        <div className={cn(
            "absolute flex items-center gap-2 select-none",
            positionStyles[position],
            className
        )}>
            <span className="w-3 h-3 border-2 border-off-white/30 rounded-full" />
            <span className="font-mono text-xs text-off-white/40 uppercase">
                {label}
            </span>
        </div>
    );
}
