import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import { FolioNumber, CornerReference, MeasurementLine, MarginAnnotation } from "@/components/ui/CodexOrnaments";
import Link from 'next/link';

async function getServices() {
    const reader = createReader(process.cwd(), keystaticConfig);
    const services = await reader.collections.services.all();
    return services;
}

async function getIndustries() {
    const reader = createReader(process.cwd(), keystaticConfig);
    const industries = await reader.collections.industries.all();
    return industries;
}

export const metadata = {
    title: "Capabilities | BytechLabs",
    description: "Technical expertise and strategic consulting for the modern enterprise.",
};

export default async function ServicesPage() {
    const services = await getServices();
    const industries = await getIndustries();

    return (
        <main className="min-h-screen bg-ink pt-32 pb-16 px-6 sm:px-12 relative overflow-hidden">
            {/* --- CODEX ORNAMENTS --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <FolioNumber number="03" />
                <CornerReference label="FIG. 03" position="top-left" />
                <CornerReference label="CAPABILITIES" position="bottom-left" />
                <MeasurementLine orientation="horizontal" length="w-screen" className="absolute left-0 bottom-24 opacity-10" />
                <MarginAnnotation text="Technical & Strategic" position="left" className="top-1/4 opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto space-y-24 relative z-10">

                {/* Header */}
                <div className="space-y-6">
                    <Breadcrumbs />
                    <div className="border-l-2 border-off-white/20 pl-6 py-2">
                        <h1 className="font-serif text-6xl sm:text-8xl text-off-white">Capabilities</h1>
                        <p className="font-mono text-off-white/60 max-w-2xl text-lg mt-4">
                            Technical expertise and strategic consulting for the modern enterprise.
                        </p>
                    </div>
                </div>

                {/* Services Grid */}
                <div>
                    <div className="flex items-center gap-4 mb-8 border-b border-off-white/10 pb-4">
                        <span className="w-2 h-2 bg-off-white/50 rounded-full" />
                        <h2 className="font-mono text-xs uppercase tracking-widest text-off-white/40">
                            Core Services
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.length > 0 ? services.map((s, idx) => (
                            <div key={s.slug} className="group space-y-4 p-6 border border-off-white/10 rounded-sm hover:border-off-white/30 transition-colors relative">
                                <span className="absolute top-4 right-4 font-mono text-[10px] text-off-white/10 group-hover:text-off-white/30">
                                    0{idx + 1}
                                </span>
                                <div className="text-4xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-500 origin-left">{s.entry.icon}</div>
                                <h3 className="font-serif text-2xl text-off-white">{s.entry.title}</h3>
                                <p className="text-off-white/70 leading-relaxed text-sm font-sans">{s.entry.description}</p>
                            </div>
                        )) : (
                            // Fallback/Default Services if no CMS content
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="space-y-4 p-6 border border-off-white/10 rounded-sm opacity-50">
                                    <div className="w-12 h-12 bg-off-white/10 rounded animate-pulse" />
                                    <div className="h-6 bg-off-white/10 rounded w-3/4 animate-pulse" />
                                    <div className="h-20 bg-off-white/10 rounded w-full animate-pulse" />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Industries Grid */}
                <div>
                    <div className="flex items-center gap-4 mb-8 border-b border-off-white/10 pb-4">
                        <span className="w-2 h-2 bg-off-white/50 rounded-full" />
                        <h2 className="font-mono text-xs uppercase tracking-widest text-off-white/40">
                            Industries & Verticals
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {industries.length > 0 ? industries.map(ind => (
                            <Link href={`/industries/${ind.slug}`} key={ind.slug} className="group p-6 border border-off-white/10 rounded-sm hover:bg-off-white/5 transition-colors flex flex-col items-center text-center block">
                                <div className="text-3xl mb-3 grayscale group-hover:grayscale-0 transition-all">{ind.entry.icon}</div>
                                <h3 className="font-serif text-xl text-off-white italic">{ind.entry.customTitle || ind.entry.title}</h3>
                            </Link>
                        )) : (
                            <div className="col-span-full py-12 text-center">
                                <p className="font-mono text-off-white/30">Industry specializations loading...</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <div className="h-24" />
        </main>
    );
}
