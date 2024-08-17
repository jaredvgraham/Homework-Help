import LandingNav from "@/components/navbars/LandingNav";
import SessionWrapper from "@/components/SessionWrapper";
import { AuthProvider } from "@/context/AuthContext";
import StudentSidebar from "@/components/sidebars/StudentSidebar";
import TeacherNavBar from "@/components/navbars/TeacherNav";
import TeacherSidebar from "@/components/sidebars/TeacherSidebar";
import StudentNav from "@/components/navbars/StudentNav";
import { use } from "react";
import { redirect } from "next/navigation";

import { getRole } from "@/actions/auth";

export default async function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("teacher layout");
  console.log("teacher layout");
  console.log("teacher layout");
  console.log("teacher layout");
  console.log("teacher layout");
  console.log("teacher layout");
  console.log("teacher layout");
  console.log("teacher layout");
  console.log("teacher layout");
  console.log("teacher layout");

  const role = await getRole();
  console.log("roe from me", role);
  if (!role) {
    redirect("/login");
  } else if (role !== "teacher") {
    redirect(`/${role}`);
  }

  return (
    <SessionWrapper>
      <div className="flex">
        <TeacherSidebar />
        <div className="flex-col w-full">
          <TeacherNavBar />

          {children}
        </div>
      </div>
    </SessionWrapper>
  );
}
