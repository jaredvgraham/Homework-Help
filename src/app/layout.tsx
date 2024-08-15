import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LandingNav from "@/components/navbars/LandingNav";
import SessionWrapper from "@/components/SessionWrapper";
import { AuthProvider } from "@/context/AuthContext";
import StudentSidebar from "@/components/sidebars/StudentSidebar";
import TeacherNavBar from "@/components/navbars/TeacherNav";
import TeacherSidebar from "@/components/sidebars/TeacherSidebar";
import StudentNav from "@/components/navbars/StudentNav";

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

            <div className="flex">
              <StudentSidebar />
              <TeacherSidebar />
              <div className="flex-col w-full">
                <StudentNav />
                <TeacherNavBar />

                {children}
              </div>
            </div>
          </body>
        </html>
      </AuthProvider>
    </SessionWrapper>
  );
}
