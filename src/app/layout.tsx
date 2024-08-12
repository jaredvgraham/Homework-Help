import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LandingNav from "@/components/navbars/LandingNav";
import SessionWrapper from "@/components/SessionWrapper";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homework Help",
  description: "Get help with your homework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <LandingNav />
            {children}
          </body>
        </html>
      </AuthProvider>
    </SessionWrapper>
  );
}
