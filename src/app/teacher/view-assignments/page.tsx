"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const ViewAssignments = () => {
  type ClassAndDue = {
    classId: string;
    dueDate: string;
  };

  type Class = {
    _id: string;
    name: string;
    subject: string;
    teacher: string;
    assignments: string[];
    school: string;
    students: string[];
  };

  type Assignment = {
    _id: string;
    title: string;
    classes: ClassAndDue[];
    teacher: string;
    questions: any[];
    youtubeLinks: string[];
  };

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDueDate, setSelectedDueDate] = useState<string>("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("/api/teacher/classes"); // Adjust the endpoint as needed
        setClasses(res.data); // Assuming the backend returns an array of classes
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };
    const fetchAssignments = async () => {
      try {
        const res = await axios.get("/api/teacher/assignments/get-assignments");

        setAssignments(res.data.assignments);
        console.log("assignments are:", res.data.assignments);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      }
    };
    fetchAssignments();

    fetchClasses();
  }, []);

  const handleAssign = async (assignmentId: string) => {
    const assignmentToAssign = {
      assignmentId,
      classes: [{ classId: selectedClass, dueDate: selectedDueDate }],
    };
    console.log("assignmentToAssign:", assignmentToAssign);

    try {
      const res = await axios.put(
        "/api/teacher/assignments/assign-assignments",
        assignmentToAssign
      );
      if (res.status === 200) {
        alert("Assignment assigned successfully!");
      } else {
        alert("Failed to assign assignment.");
      }
    } catch (error) {
      console.error("Error assigning assignment:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {assignments &&
        assignments?.map((assignment) => (
          <div
            key={assignment._id}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <h2 className="text-lg font-semibold">{assignment.title}</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Select Class:</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Select Due Date:</label>
                <input
                  type="date"
                  value={selectedDueDate}
                  onChange={(e) => setSelectedDueDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => handleAssign(assignment._id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Assign to Class
              </button>
            </form>
          </div>
        ))}
    </div>
  );
};

export default ViewAssignments;
