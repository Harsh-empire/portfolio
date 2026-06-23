import type { Metadata } from "next";
import { Inter, Outfit, EB_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import ScrollFX from "@/components/ScrollFX";
import AuroraOrbs from "@/components/AuroraOrbs";
import GrainOverlay from "@/components/GrainOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Harsh Kumar | AI Architect",
  description: "World-class portfolio of an AI Architect and Software Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${ebGaramond.variable} antialiased bg-black text-white cursor-none`}
      >
        <SmoothScroller>
          <AuroraOrbs />
          <GrainOverlay />
          <CustomCursor />
          <ScrollFX />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
