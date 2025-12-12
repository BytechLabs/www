import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactSection_Letter } from "@/components/sections/ContactSection_Letter";

export const metadata = {
    title: "Contact | BytechLabs",
    description: "Get in touch with our team to discuss your next enterprise project.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-ink pt-32 pb-0">
            <div className="px-6 sm:px-12 max-w-7xl mx-auto mb-12">
                <Breadcrumbs />
            </div>

            {/* Reuse the Letter Contact Section */}
            <ContactSection_Letter />

            <div className="h-24" />
        </main>
    );
}
