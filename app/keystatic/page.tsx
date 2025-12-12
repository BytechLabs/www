"use client";

import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('./KeystaticPage'), {
    ssr: false,
    loading: () => <div>Loading Keystatic Admin...</div>
});

export default function Page() {
    return <Admin />;
}
