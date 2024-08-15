"use client";
import { useState } from "react";

import Sidebar from "@/components/assignment-workspace/Sidebar";
import AssignmentDetails from "@/components/assignment-workspace/AssignmentDetails";
import Questions from "@/components/assignment-workspace/Questions";
import Preview from "@/components/assignment-workspace/Preview";
import axios from "axios";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const drawerWidth = 240;

const CreateAssignment = () => {
  const [selectedSection, setSelectedSection] = useState("details");
  const [assignmentData, setAssignmentData] = useState<any>({
    details: {},
    questions: [],
  });

  const updateAssignmentData = (section: string, data: any) => {
    setAssignmentData((prev: any) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleSaveAssignment = async () => {
    console.log("Saving assignment:", JSON.stringify(assignmentData, null, 2));
    console.log("date before", assignmentData.details.dueDate);

    assignmentData.details.dueDate = new Date(
      assignmentData.details.dueDate
    ).toISOString();
    console.log("date after", assignmentData.details.dueDate);
    try {
      const response = await axios.post(
        "/api/teacher/create-assignment",
        assignmentData
      );
      if (response.status === 200) {
        alert("Assignment saved successfully!");
        // Optionally, navigate to another page or clear the form
      } else {
        alert("Failed to save assignment.");
      }
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("An error occurred while saving the assignment.");
    }
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "details":
        return (
          <AssignmentDetails
            data={assignmentData.details}
            updateData={(data: any) => updateAssignmentData("details", data)}
          />
        );
      case "questions":
        return (
          <Questions
            data={assignmentData.questions}
            updateData={(data: any) => updateAssignmentData("questions", data)}
          />
        );
      case "preview":
        return <Preview data={assignmentData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex ">
      <header className="fixed w-full bg-blue-600 z-10">
        <div className="flex items-center p-4">
          <Link href="/teacher">
            <h1 className="text-white text-xl">Create Assignment</h1>
          </Link>
          <Link href="/teacher" className="ml-auto">
            <FaHome className="text-white" />
          </Link>
        </div>
      </header>

      <aside
        className="fixed h-full bg-gray-100"
        style={{ width: `${drawerWidth}px` }}
      >
        <div className="mt-16 ">
          <Sidebar
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            handleSaveAssignment={handleSaveAssignment}
          />
        </div>
      </aside>

      <main
        className="flex-grow p-6"
        style={{ marginLeft: `${drawerWidth}px` }}
      >
        <div className="mt-16">{renderContent()}</div>
      </main>
    </div>
  );
};

export default CreateAssignment;
