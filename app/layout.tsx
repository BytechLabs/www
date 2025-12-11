import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { NavigationSystem } from "@/components/layout/NavigationSystem";

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
    <html lang="en" className={`dark ${cormorant.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body>
        <div className="vignette" />
        <ScrollProgress />

        {/* Navigation System (Configurable via SYS.UI) */}
        <NavigationSystem />

        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
