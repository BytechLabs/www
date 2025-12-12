import { Container } from "@/components/layout/Container";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-ink pt-32 pb-24 text-off-white">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-serif text-5xl mb-8">Privacy Policy</h1>
                    <p className="font-mono text-xs mb-12 text-[#8c7b64] uppercase tracking-widest">Last Updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-invert prose-lg font-serif">
                        <p>
                            At BytechLabs, we prioritize the privacy and security of your data. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or engage with our services.
                        </p>

                        <h3>1. Information We Collect</h3>
                        <p>
                            We collect limited information to improve your experience and communicate with you. This may include:
                        </p>
                        <ul>
                            <li><strong>Personal Information:</strong> Name, email address, and company details provided voluntarily via contact forms.</li>
                            <li><strong>Usage Data:</strong> Anonymous analytics data regarding your visit (pages viewed, time spent) to help us optimize our site.</li>
                        </ul>

                        <h3>2. How We Use Your Information</h3>
                        <p>
                            Your data is used solely for legitimate business purposes:
                        </p>
                        <ul>
                            <li>To respond to your inquiries and project proposals.</li>
                            <li>To improve technical performance and website usability.</li>
                            <li>To comply with legal obligations.</li>
                        </ul>

                        <h3>3. Data Protection</h3>
                        <p>
                            We employ enterprise-grade security measures to protect your data. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
                        </p>

                        <h3>4. Cookies</h3>
                        <p>
                            We use minimal cookies to ensure the proper functioning of our website. You can control cookie preferences through your browser settings.
                        </p>

                        <h3>5. Contact Us</h3>
                        <p>
                            If you have questions regarding this policy, please contact us at legal@bytechlabs.com.
                        </p>
                    </div>
                </div>
            </Container>
        </main>
    );
}
