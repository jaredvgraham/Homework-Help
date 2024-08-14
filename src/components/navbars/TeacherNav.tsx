"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";

const TeacherNavBar = () => {
  const pathname = usePathname();

  const isTeacher = pathname.includes("/teacher");

  const isWorkspace = pathname.includes("/teacher/create-assignment");

  if (!isTeacher || isWorkspace) {
    return null;
  }

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link
            href="/teacher"
            className="text-white text-lg font-bold flex items-center"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
        </div>
        <div className="flex space-x-4">
          <>
            <Link
              href="/teacher/view-assignments"
              className="text-white hover:text-gray-300"
            >
              View Assignments
            </Link>
            <Link
              href="/teacher/create-assignment"
              className="text-white hover:text-gray-300"
            >
              Create Assignment
            </Link>
          </>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavBar;
