"use client";

import { useEffect, useState } from 'react';

export function DevTools() {
    // Only show in development
    const [isDev, setIsDev] = useState(false);

    useEffect(() => {
        // Simple check for dev mode or using NODE_ENV via props if passed, 
        // but checking hostname is often easier clientside without env hydration issues
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            setIsDev(true);
            console.log(
                "%c 🚀 KEYSTATIC ADMIN AVAILABLE \n%c 👉 http://localhost:3000/keystatic \n%c Edit your content locally and it will save to disk.",
                "color: #8c7b64; font-size: 16px; font-weight: bold; background: #000; padding: 4px;",
                "color: #fff; font-size: 14px; background: #333; padding: 4px;",
                "color: #ccc; font-size: 12px;"
            );
        }
    }, []);

    if (!isDev) return null;

    return (
        <a
            href="/keystatic"
            target="_blank"
            className="fixed bottom-4 right-4 z-[9999] bg-[#8c7b64] text-black font-mono text-xs font-bold px-4 py-3 rounded-sm shadow-lg hover:scale-105 hover:bg-white transition-all flex items-center gap-2"
        >
            <span>EDIT CONTENT</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </a>
    );
}
