import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Libre_Baskerville } from "next/font/google"; // [MODIFIED] Switched to Serif
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { NavigationSystem } from "@/components/layout/NavigationSystem";
import { Footer } from "@/components/layout/Footer";
import { DevTools } from "@/components/DevTools";
import { CookieConsent } from "@/components/ui/CookieConsent";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
});

export const metadata: Metadata = {
  title: "BytechLabs | Enterprise Software Architecture",
  description: "Premier software development agency building high-performance applications and secure infrastructure for global enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${cormorant.variable} ${jetbrains.variable} ${libre.variable}`} suppressHydrationWarning>
      <body>
        <div className="vignette" />
        <ScrollProgress />

        {/* Navigation System (Configurable via SYS.UI) */}
        <NavigationSystem />

        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
        <DevTools />
        <CookieConsent />
      </body>
    </html>
  );
}
