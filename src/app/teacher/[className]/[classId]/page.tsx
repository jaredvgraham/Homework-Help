"use client";
import { Class } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { className, classId } = useParams();
  const [classData, setClassData] = useState<Class | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await axios.get(`/api/teacher/classes/${classId}`);
        console.log("class:", res.data);
        setClassData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStudents = async () => {
      try {
        const res = await axios.get(`/api/teacher/classes/${classId}/students`);
        console.log("students:", res.data);
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
        console.log("assignments:", res.data);
        setAssignments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAssignments();
    fetchStudents();

    fetchClass();
  }, [classId, className]);

  return (
    <div className="bg-white text-black flex-1">
      {classData && (
        <div>
          <h1>{classData.name}</h1>
          <p>Teach</p>
          <h2>Students</h2>
          <ul>
            {students.map((student) => (
              <li key={student._id}>{student.name}</li>
            ))}
          </ul>
          <h2>Assignments</h2>
          <ul>
            {assignments.map((assignment) => (
              <li key={assignment._id}>{assignment.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default page;
