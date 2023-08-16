import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import NextAuthProvider, {
  LoadingWrapper,
} from "@/components/Providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Remote Code Jobs",
  description: "Simple and easy job board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <NextAuthProvider>
          <Analytics />
          <LoadingWrapper>
            <ToastContainer />
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </LoadingWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
