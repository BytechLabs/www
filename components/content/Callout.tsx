import React, { ReactNode } from 'react';

interface CalloutProps {
    type?: 'info' | 'warning' | 'tip';
    children: ReactNode;
}

export function Callout({ type = 'info', children }: CalloutProps) {
    const styles = {
        info: "bg-blue-900/20 border-blue-500/30 text-blue-100",
        warning: "bg-amber-900/20 border-amber-500/30 text-amber-100",
        tip: "bg-emerald-900/20 border-emerald-500/30 text-emerald-100",
    };

    const icons = {
        info: "ℹ️",
        warning: "⚠️",
        tip: "💡",
    };

    return (
        <div className={`p-4 my-8 border rounded-lg flex gap-4 items-start not-prose ${styles[type]}`}>
            <span className="text-xl select-none">{icons[type]}</span>
            <div className="prose prose-invert prose-sm max-w-none">
                {children}
            </div>
        </div>
    );
}
