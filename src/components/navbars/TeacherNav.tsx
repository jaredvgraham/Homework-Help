"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBell, FaUserCircle } from "react-icons/fa";

const TeacherNavBar = () => {
  const pathname = usePathname();

  const isTeacher = pathname.includes("/teacher");
  const isWorkspace = pathname.includes("/teacher/create-assignment");

  if (!isTeacher || isWorkspace) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 w-full">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Centered Links */}
        <div className="flex justify-center flex-1 space-x-8">
          <Link
            href="/teacher"
            className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-700 transition"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
          <Link
            href="/teacher/view-assignments"
            className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium transition"
          >
            View Assignments
          </Link>
          <Link
            href="/teacher/create-assignment"
            className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium transition"
          >
            Create Assignment
          </Link>
        </div>

        {/* Icons on the right */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaBell className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="relative">
            <button
              type="button"
              className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaUserCircle
                className="h-8 w-8 text-gray-600"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/teacher"
            className="text-indigo-700 block pl-3 pr-4 py-2 text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/teacher/view-assignments"
            className="text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 text-base font-medium transition"
          >
            View Assignments
          </Link>
          <Link
            href="/teacher/create-assignment"
            className="text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 text-base font-medium transition"
          >
            Create Assignment
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavBar;
