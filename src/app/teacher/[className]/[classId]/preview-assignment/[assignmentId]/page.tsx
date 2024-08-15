"use client";
import ViewAssignment from "@/components/teacher/ViewAssignment";
import { Assignment } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PreviewAssignment = () => {
  const { className, classId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState<Assignment>();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axios.get(
          `/api/teacher/classes/${classId}/assignments/${assignmentId}`
        );
        setAssignment(res.data);
        console.log("assignment is:", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAssignment();
  }, [className, classId, assignmentId]);

  return <ViewAssignment assignment={assignment} />;
};

export default PreviewAssignment;
