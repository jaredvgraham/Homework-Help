"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";

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
    class: ClassAndDue[];
    teacher: string;
    questions: any[];
    youtubeLinks: string[];
  };

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [assignmentStates, setAssignmentStates] = useState<{
    [key: string]: { selectedClass: string; selectedDueDate: string };
  }>({});

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("/api/teacher/classes");
        setClasses(res.data);
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
    const { selectedClass, selectedDueDate } =
      assignmentStates[assignmentId] || {};
    const assignmentToAssign = {
      assignmentId,
      classes: [{ classId: selectedClass, dueDate: selectedDueDate }],
    };

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

  const handleSelectClass = (assignmentId: string, classId: string) => {
    setAssignmentStates((prevState) => ({
      ...prevState,
      [assignmentId]: {
        ...prevState[assignmentId],
        selectedClass: classId,
      },
    }));
    setDropdownOpen((prevState) => ({
      ...prevState,
      [assignmentId]: false,
    }));
  };

  const handleDueDateChange = (assignmentId: string, dueDate: string) => {
    setAssignmentStates((prevState) => ({
      ...prevState,
      [assignmentId]: {
        ...prevState[assignmentId],
        selectedDueDate: dueDate,
      },
    }));
  };

  const isClassAssigned = (assignment: Assignment, classId: string) => {
    if (!assignment.class) {
      console.log("No classes found");
      return false;
    }

    return assignment.class.some((cls) => cls.classId === classId);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {assignments &&
        assignments.map((assignment) => {
          const { selectedClass = "", selectedDueDate = "" } =
            assignmentStates[assignment._id] || {};
          return (
            <div
              key={assignment._id}
              className="bg-white p-4 rounded-md shadow-md"
            >
              <h2 className="text-lg font-semibold">{assignment.title}</h2>
              <form>
                <div className="mb-4 relative">
                  <label className="block text-gray-700">Select Class:</label>
                  <div
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
                    onClick={() =>
                      setDropdownOpen((prevState) => ({
                        ...prevState,
                        [assignment._id]: !prevState[assignment._id],
                      }))
                    }
                  >
                    {selectedClass
                      ? classes.find((cls) => cls._id === selectedClass)?.name
                      : "Select a class"}
                    <span className="absolute top-2/4 mt-4 right-3 transform -translate-y-1/2">
                      {dropdownOpen[assignment._id] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  </div>
                  {dropdownOpen[assignment._id] && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-auto">
                      {classes.map((cls) => (
                        <li
                          key={cls._id}
                          onClick={() =>
                            handleSelectClass(assignment._id, cls._id)
                          }
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between ${
                            selectedClass === cls._id ? "bg-gray-100" : ""
                          }`}
                        >
                          {cls.name}
                          {isClassAssigned(assignment, cls._id) && (
                            <FaCheck className="text-green-500" />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Select Due Date:
                  </label>
                  <input
                    type="date"
                    value={selectedDueDate}
                    onChange={(e) =>
                      handleDueDateChange(assignment._id, e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleAssign(assignment._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Assign to Class
                </button>
              </form>
            </div>
          );
        })}
    </div>
  );
};

export default ViewAssignments;
