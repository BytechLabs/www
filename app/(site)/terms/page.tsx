import { Container } from "@/components/layout/Container";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-ink pt-32 pb-24 text-off-white">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-serif text-5xl mb-8">Terms of Service</h1>
                    <p className="font-mono text-xs mb-12 text-[#8c7b64] uppercase tracking-widest">Last Updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-invert prose-lg font-serif">
                        <p>
                            By accessing or using the BytechLabs website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>

                        <h3>1. Intellectual Property</h3>
                        <p>
                            All content, code, design, and functionality on this website is the intellectual property of BytechLabs, unless otherwise noted. Unauthorized reproduction or redistribution is strictly prohibited.
                        </p>

                        <h3>2. Usage License</h3>
                        <p>
                            Permission is granted to temporarily view the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                        </p>

                        <h3>3. Disclaimer</h3>
                        <p>
                            The materials on BytechLabs' website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
                        </p>

                        <h3>4. Limitation of Liability</h3>
                        <p>
                            In no event shall BytechLabs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on our website.
                        </p>

                        <h3>5. Governing Law</h3>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which BytechLabs operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                        </p>
                    </div>
                </div>
            </Container>
        </main>
    );
}
