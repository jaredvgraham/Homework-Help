import SessionWrapper from "@/components/SessionWrapper";
import StudentSidebar from "@/components/sidebars/StudentSidebar";
import StudentNav from "@/components/navbars/StudentNav";
import { redirect } from "next/navigation";
import { getRole } from "@/actions/auth";

export default async function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await getRole();
  console.log("role from me", role);
  if (!role) {
    console.log("no role");
    redirect("/login");
  } else if (role !== "student") {
    console.log("redirecting to", role);
    redirect(`/${role}`);
  }

  return (
    <SessionWrapper>
      <div className="flex">
        <StudentSidebar />
        <div className="flex-col w-full">
          <StudentNav />
          {children}
        </div>
      </div>
    </SessionWrapper>
  );
}
