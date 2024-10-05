import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./_store/StoreProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Londrina_Solid, Josefin_Sans } from "next/font/google";
import Toaster from "../components/Toaster";
import { Analytics } from "@vercel/analytics/react";

const londrinaSolid = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  variable: "--font-londrina-solid",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  weight: ["100", "300", "400", "700"],
  variable: "--font-josefin-sans",
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
        className={`${londrinaSolid.variable} ${josefinSans.variable} antialiased`}
      >
        <div className="grid grid-rows-[6rem_1fr_4rem] items-center justify-items-center min-h-screen font-[family-name:var(--font-londrinaSolid-sans)]">
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
