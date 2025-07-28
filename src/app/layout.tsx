import LoginPortal from "@/components/login-portal";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import type { Metadata } from "next";
import { Lora, Space_Grotesk } from "next/font/google";
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
        className={`${mainFont.variable} ${headFont.variable} relative h-svh overflow-hidden antialiased`}
      >
        <div className="flex h-full">
          <div className="">
            <Sidebar />
          </div>
          <div className="relative h-full flex-1">
            <Navbar />
            <div className="mt-[50px] h-full w-full overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
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
