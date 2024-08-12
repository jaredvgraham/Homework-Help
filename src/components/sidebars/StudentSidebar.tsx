"use client";

import { Class } from "@/types";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaBeer,
  FaBookOpen,
  FaCalculator,
  FaFlask,
  FaPaintBrush,
} from "react-icons/fa";

const StudentSidebar = () => {
  const icons = {
    Math: <FaCalculator style={{ color: "blue" }} />,
    Science: <FaFlask style={{ color: "yellow" }} />,
    Art: <FaPaintBrush style={{ color: "black" }} />,
    History: <FaBookOpen style={{ color: "green" }} />,
  };

  const [classes, setClasses] = useState<Class[]>([]);
  const [isOpen, setIsOpen] = useState(false);
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
        console.log(fixedClasses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClasses();
  }, []);

  if (!isStudentPage) {
    return null;
  }

  return (
    <div className="flex">
      {/* Toggle button for small screens */}
      <button
        className="md:hidden p-2 bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 h-screen bg-gray-800 text-white shadow-lg p-4 overflow-y-auto transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-20`}
      >
        <h2 className="text-2xl font-semibold mb-4">Classes</h2>
        <ul>
          {classes &&
            classes.map((studentClass) => (
              <li key={studentClass._id} className="mb-2">
                <h1 className="text-lg">
                  {icons[studentClass.name as keyof typeof icons]}

                  {studentClass.name}
                </h1>
              </li>
            ))}
        </ul>
      </div>

      {/* Main content area */}
      <div className="  p-4">
        {/* Your main content goes here */}
        <p>
          Here is the main content that will be displayed next to the sidebar.
        </p>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-transparent"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default StudentSidebar;
