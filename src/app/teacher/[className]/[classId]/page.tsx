"use client";

import { Class } from "@/types";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const Page = () => {
  const { className, classId } = useParams();
  const [classData, setClassData] = useState<Class | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const Router = useRouter();

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await axios.get(`/api/teacher/classes/${classId}`);
        setClassData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStudents = async () => {
      try {
        const res = await axios.get(`/api/teacher/classes/${classId}/students`);
        setStudents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          `/api/teacher/classes/${classId}/assignments`
        );
        setAssignments(res.data);
        console.log("assignments are:", res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClass();
    fetchStudents();
    fetchAssignments();
  }, [classId, className]);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {classData && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-indigo-600 mb-2">
              {classData.name}
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome to your class dashboard. Manage your students and
              assignments below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Students Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Students
              </h2>
              <ul className="space-y-3">
                {students.map((student) => (
                  <li
                    key={student._id}
                    className="bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition"
                  >
                    {student.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Assignments Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Assignments
              </h2>
              <ul className="space-y-3">
                {assignments.map((assignment) => (
                  <li
                    onClick={() =>
                      Router.push(
                        `/teacher/${className}/${classId}/preview-assignment/${assignment._id}`
                      )
                    }
                    key={assignment._id}
                    className="bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition"
                  >
                    {assignment.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
