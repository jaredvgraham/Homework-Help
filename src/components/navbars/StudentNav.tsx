"use client";
import React from "react";
import { FaHome, FaBell, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StudentNav = () => {
  const pathname = usePathname();

  const isStudentPage = pathname.includes("/student");

  if (!isStudentPage) {
    return null;
  }

  const isClassPage = pathname.match(/^\/student\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+/);

  const defaultLinks = [
    { href: "/student", text: "Dashboard" },
    { href: "/student/classes", text: "Classes" },
    { href: "/student/assignments", text: "Assignments" },
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
              className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-700 transition"
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
              className="text-indigo-700 block pl-3 pr-4 py-2 text-base font-medium"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default StudentNav;
