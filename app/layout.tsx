import type { Metadata } from "next";
import { Poppins, Bitter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/custom/Navigation/Navbar";
import Footer from "@/components/custom/Navigation/Footer";
import FloatingActions from "@/components/custom/FloatingActions";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nirvanatoday.com"),
  title: "Nirvana Today",
  description: "Experience premium wellness with Nirvana Today",
  keywords: ["CBD", "Wellness", "Natural Health", "Veteran Owned", "Shopify CBD", "Vapes", "Gummies", "Nirvana Today"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", poppins.variable, bitter.variable, geistMono.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <Toaster position="top-center" richColors />
        <FloatingActions />
      </body>
    </html>
  );
}
