"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ className }: { className?: string }) {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm font-mono uppercase tracking-wider text-off-white/40", className)}>
            <Link href="/" className="hover:text-off-white transition-colors">
                Index
            </Link>
            {segments.map((segment, index) => {
                const href = `/${segments.slice(0, index + 1).join("/")}`;
                const isLast = index === segments.length - 1;

                return (
                    <Fragment key={href}>
                        <span className="mx-2 text-off-white/20">/</span>
                        {isLast ? (
                            <span className="text-off-white pointer-events-none">
                                {segment.replace(/-/g, " ")}
                            </span>
                        ) : (
                            <Link href={href} className="hover:text-off-white transition-colors">
                                {segment.replace(/-/g, " ")}
                            </Link>
                        )}
                    </Fragment>
                );
            })}
        </nav>
    );
}
