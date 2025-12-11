import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
    sm: "max-w-4xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
};

/**
 * Container component for consistent spacing and max-width
 */
export function Container({ children, className, size = "lg" }: ContainerProps) {
    return (
        <div className={cn(
            "mx-auto px-6 sm:px-8 lg:px-12",
            sizeMap[size],
            className
        )}>
            {children}
        </div>
    );
}
