import type { Metadata } from "next";
import { Literata } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

import type { Metadata, Viewport } from "next";

// ... (imports)

export const viewport: Viewport = {
  themeColor: "#0F766E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Navkar Siddhi Tap",
  description: "Count your Navkar mantras with mala tapping",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Navkar Tap",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${literata.variable} font-body antialiased`}
      >
        <ServiceWorkerRegister />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
