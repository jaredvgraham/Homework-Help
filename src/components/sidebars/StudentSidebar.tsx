"use client";

import { Class } from "@/types";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import {
  FaBeer,
  FaBookOpen,
  FaCalculator,
  FaFlask,
  FaHome,
  FaPaintBrush,
} from "react-icons/fa";

const StudentSidebar = () => {
  const icons = {
    Math: <FaCalculator className="mr-3 text-indigo-500" />,
    Science: <FaFlask className="mr-3 text-green-500" />,
    Art: <FaPaintBrush className="mr-3 text-orange-500" />,
    History: <FaBookOpen className="mr-3 text-blue-500" />,
  };

  const [classes, setClasses] = useState<Class[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const isStudentPage = pathname.startsWith("/student");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("/api/student/classes");
        const fixedClasses = res.data.classes.map((studentClass: any) => {
          return {
            _id: studentClass._id,
            name: studentClass.name.split(" ")[0],
          };
        });
        setClasses(fixedClasses);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  if (!isStudentPage) {
    return null;
  }

  return (
    <div className="relative">
      {/* Toggle button for small screens */}
      <button
        className="md:hidden p-3 rounded-full bg-blue-600 text-white shadow-lg fixed top-4 left-4 z-30 transform transition-transform duration-300 hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative top-0 left-0 w-64 h-screen bg-white text-gray-900 shadow-2xl border-r border-gray-200 p-6 transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-600">
          Classes
        </h2>
        <ul>
          <li className="mb-6">
            <Link
              href={"/student"}
              className={`flex items-center p-4 rounded-lg text-lg font-medium hover:bg-blue-100 transition-all duration-200 ${
                pathname === "/student"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>
          </li>
          {classes &&
            classes.map((studentClass) => (
              <li key={studentClass._id} className="mb-6">
                <Link
                  href={`/student/${studentClass.name.toLowerCase()}/${
                    studentClass._id
                  }`}
                  className={`flex items-center p-4 rounded-lg text-lg font-medium hover:bg-blue-100 transition-all duration-200 ${
                    pathname ===
                    `/student/${studentClass.name.toLowerCase()}/${
                      studentClass._id
                    }`
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {icons[studentClass.name as keyof typeof icons]}
                  {studentClass.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentSidebar;
