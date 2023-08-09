import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider, {
  LoadingWrapper,
} from "@/components/Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
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
    <NextAuthProvider>
      <html lang="en" data-theme="light">
        <body className={`${inter.className} flex flex-col h-screen`}>
          <ToastContainer />
          <LoadingWrapper>
            <Header />
            {children}
          </LoadingWrapper>
        </body>
      </html>
    </NextAuthProvider>
  );
}
