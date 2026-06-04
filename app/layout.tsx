import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "Sravan Mummareddy — systems product engineer building scalable backend systems and intelligent operational platforms.";

export const metadata: Metadata = {
  title: {
    default: "Sravan Mummareddy — Systems Product Engineer",
    template: "%s · Sravan Mummareddy",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Sravan Mummareddy",
  authors: [{ name: "Sravan Mummareddy" }],
  keywords: [
    "Sravan Mummareddy",
    "software engineer",
    "backend systems",
    "distributed systems",
    "AI workflows",
    "platform engineering",
  ],
  openGraph: {
    title: "Sravan Mummareddy — Systems Product Engineer",
    description: SITE_DESCRIPTION,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-text-primary flex flex-col">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
