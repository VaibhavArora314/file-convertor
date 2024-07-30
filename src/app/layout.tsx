import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FileMorph",
  description: "Convert your files effortlessly with our user-friendly tool. Compatible with a wide range of image, video, and audio formats for seamless use. Enjoy complete security and privacy with local file conversion and storage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen bg-[#021526] px-4"}>
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
