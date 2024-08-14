import Link from "next/link";
import React from "react";

const TeacherDash = () => {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <p>Welcome to the teacher dashboard</p>
      <div className="flex space-x-4">
        <Link
          href={"/teacher/create-assignment"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Assignment
        </Link>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Assignments
        </button>
      </div>
    </div>
  );
};

export default TeacherDash;
