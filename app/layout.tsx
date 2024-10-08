import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./_store/StoreProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Jersey_25, Roboto } from "next/font/google";
import Toaster from "../components/Toaster";
import { Analytics } from "@vercel/analytics/react";

const titleFont = Jersey_25({
  weight: ["400"],
  variable: "--font-title",
  subsets: ["latin"],
});

const bodyFont = Roboto({
  weight: ["400", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeXter Launchpad",
  description: "The first meme fair launch platform on Radix",
  // icons: {
  //   icon: "/images/favicon.png",
  // },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "Radix.Meme",
    title: "DeXter Launchpad",
    description: "The first meme fair launch platform on Radix",
    images: [
      {
        url: process.env.NEXT_PUBLIC_OG_IMG_URL as string,
        width: 1200,
        height: 630,
        alt: "Radix.Meme",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${bodyFont.variable} ${titleFont.variable} antialiased`}
      >
        <div className="grid grid-rows-[6rem_1fr_4rem] items-center justify-items-center min-h-screen">
          <StoreProvider>
            <Navbar />
            {children}
            <Footer />
          </StoreProvider>
          <Toaster />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
