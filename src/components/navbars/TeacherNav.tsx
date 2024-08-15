"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBell, FaUserCircle } from "react-icons/fa";

const TeacherNavBar = () => {
  const pathname = usePathname();

  const isTeacher = pathname.includes("/teacher");
  const isWorkspace = pathname.includes("/teacher/create-assignment");
  const isClassPage = pathname.split("/").length > 2;

  if (!isTeacher || isWorkspace) {
    return null;
  }

  const defaultLinks = [
    { href: "/teacher", text: "Home" },
    { href: "/teacher/view-assignments", text: "View Assignments" },
    { href: "/teacher/create-assignment", text: "Create Assignment" },
  ];

  const classLinks = [
    { href: pathname, text: "Overview" },
    { href: `${pathname}/stream`, text: "Stream" },
    { href: `${pathname}/assignments`, text: "Assignments" },
  ];

  const linksToRender = isClassPage ? classLinks : defaultLinks;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 w-full">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Centered Links */}
        <div className="flex justify-center flex-1 space-x-8">
          {linksToRender.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-indigo-700 border-b-2 border-indigo-500"
                  : "text-gray-500"
              } hover:text-indigo-700 inline-flex items-center px-1 pt-1 text-sm font-medium transition`}
            >
              {link.text}
            </Link>
          ))}
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
          {linksToRender.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-indigo-700 border-l-4 border-indigo-500"
                  : "text-gray-600"
              } block pl-3 pr-4 py-2 text-base font-medium transition`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavBar;
