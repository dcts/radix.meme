import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./_store/StoreProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Londrina_Solid, Josefin_Sans } from "next/font/google";

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

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "DeXter Launchpad",
  description: "The first meme fair launch platform on Radix",
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
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-londrinaSolid-sans)]">
          <StoreProvider>
            <Navbar />
            {children}
            <Footer />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
