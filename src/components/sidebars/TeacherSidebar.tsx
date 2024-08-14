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
    Math: <FaCalculator style={{ color: "white", marginRight: "10px" }} />,
    Science: <FaFlask style={{ color: "white", marginRight: "10px" }} />,
    Art: <FaPaintBrush style={{ color: "white", marginRight: "10px" }} />,
    History: <FaBookOpen style={{ color: "white", marginRight: "10px" }} />,
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
        const res = await axios.get("/api/teacher/classes"); // Adjust the endpoint as needed
        setClasses(res.data); // Assuming the backend returns an array of classes
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
        className="md:hidden p-2 bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`w-64 h-screen bg-white text-white shadow-2xl p-4 overflow-y-auto transform font-light ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-20`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-500 text-center p-4">
          Classes
        </h2>
        <ul>
          <li className="mb-2">
            <Link
              href={"/student"}
              className={`text-lg flex items-center  p-2 text-white rounded-md hover:bg-blue-500 hover:cursor-pointer ${
                pathname === "/student" ? "bg-blue-500" : "bg-black"
              }`}
            >
              <FaHome style={{ color: "white", marginRight: "10px" }} />
              Dashboard
            </Link>
          </li>
          {classes &&
            classes.map((studentClass) => (
              <div key={studentClass._id} className="">
                <li key={studentClass._id} className="mb-2 ">
                  <Link
                    href={`/student/${studentClass.name.toLocaleLowerCase()}/${
                      studentClass._id
                    }`}
                    className={`text-lg flex items-center  p-2 text-white rounded-md hover:bg-blue-500 hover:cursor-pointer ${
                      pathname ===
                      `/student/${studentClass.name.toLocaleLowerCase()}/${
                        studentClass._id
                      }`
                        ? "bg-blue-500"
                        : "bg-black"
                    }`}
                  >
                    {icons[studentClass.name as keyof typeof icons]}

                    {studentClass.name}
                  </Link>
                </li>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherSidebar;
