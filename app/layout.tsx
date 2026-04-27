import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "./providers/lenis-provider";
import { PROFILE } from "@/lib/data";

const displayFont = Manrope({
  subsets: ["latin"],
  variable: "--font-display-family",
  weight: ["400", "500", "600", "700", "800"],
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans-family",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${PROFILE.name} - ${PROFILE.role}`,
    template: `%s | ${PROFILE.name}`,
  },
  description: PROFILE.bioEn,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body>
        <LenisProvider>
          {/* Global Architectural Grid Lines */}
          <div className="fixed inset-0 pointer-events-none z-[-1] flex justify-center px-[var(--padding-page)]">
            <div className="w-full max-w-[var(--content-max)] h-full border-x border-black/[0.04]" />
          </div>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
