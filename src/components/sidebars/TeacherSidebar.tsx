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

const TeacherSidebar = () => {
  const icons = {
    Math: <FaCalculator className="mr-3 text-blue-500" />,
    Science: <FaFlask className="mr-3 text-green-500" />,
    Art: <FaPaintBrush className="mr-3 text-yellow-500" />,
    History: <FaBookOpen className="mr-3 text-purple-500" />,
  };

  const [classes, setClasses] = useState<Class[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isWorkspace = pathname.includes("/teacher/create-assignment");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("/api/teacher/classes");
        setClasses(res.data);
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

  if (!isTeacherPage || isWorkspace) {
    return null;
  }

  return (
    <div className="relative">
      {/* Toggle button for small screens */}
      <button
        className="md:hidden p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white fixed top-4 left-4 z-30 shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative top-0 left-0 w-72 h-screen bg-white shadow-2xl border-r border-gray-200 p-6 rounded-br-3xl transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-center mb-8">
          <img
            src="/logo.png" // Replace with your logo path
            alt="App Logo"
            className="h-10 w-10 mr-2"
          />
          <h2 className="text-2xl font-bold text-gray-700">Your Classes</h2>
        </div>
        <ul>
          <li className="mb-4">
            <Link
              href={"/teacher"}
              className={`flex items-center p-3 rounded-lg text-lg hover:bg-blue-100 transition-all duration-200 ${
                pathname === "/student"
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              <FaHome className="mr-3 text-blue-600" />
              Dashboard
            </Link>
          </li>
          {classes &&
            classes.map((studentClass) => (
              <li key={studentClass._id} className="mb-4 group">
                <Link
                  href={`/teacher/${studentClass.name.toLowerCase()}/${
                    studentClass._id
                  }`}
                  className={`flex items-center p-3 rounded-lg text-lg transition-all duration-200 group-hover:bg-gray-100 ${
                    pathname ===
                    `/teacher/${studentClass.name.toLowerCase()}/${
                      studentClass._id
                    }`
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {icons[studentClass.subject as keyof typeof icons]}
                  <span className="flex-grow">{studentClass.name}</span>
                </Link>
              </li>
            ))}
        </ul>
        <div className="absolute bottom-8 left-6 right-6 text-center">
          <Link
            href="/settings"
            className="inline-flex items-center justify-center w-full p-3 bg-gradient-to-r from-slate-200 to-blue-500  rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-black"
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;
