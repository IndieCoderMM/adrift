import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const mainFont = Space_Grotesk({
  variable: "--font-main",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adrift",
  description: "How far have you been drifting?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.variable} h-screen overflow-hidden antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
