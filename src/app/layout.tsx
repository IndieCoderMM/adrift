import LoginPortal from "@/components/login-portal";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Lora, Patrick_Hand, Space_Grotesk } from "next/font/google";
import { Flip, ToastContainer } from "react-toastify";
import "./globals.css";

const mainFont = Space_Grotesk({
  variable: "--font-main",
  subsets: ["latin"],
});

const headFont = Lora({
  variable: "--font-head",
  subsets: ["latin"],
});

const handFont = Patrick_Hand({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
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
        className={`${mainFont.variable} ${headFont.variable} ${handFont.variable} relative min-h-screen antialiased`}
      >
        <Navbar />
        {children}
        <LoginPortal />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
        />
        <script src="https://js.puter.com/v2/"></script>
      </body>
    </html>
  );
}
