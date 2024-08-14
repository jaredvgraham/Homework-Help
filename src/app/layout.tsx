import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LandingNav from "@/components/navbars/LandingNav";
import SessionWrapper from "@/components/SessionWrapper";
import { AuthProvider } from "@/context/AuthContext";
import StudentSidebar from "@/components/sidebars/StudentSidebar";
import TeacherNavBar from "@/components/navbars/TeacherNav";
import TeacherSidebar from "@/components/sidebars/TeacherSidebar";

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
            <TeacherNavBar />

            <div className="flex">
              <StudentSidebar />
              <TeacherSidebar />

              {children}
            </div>
          </body>
        </html>
      </AuthProvider>
    </SessionWrapper>
  );
}
