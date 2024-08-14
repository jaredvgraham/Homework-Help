"use client";
import { SignOut } from "@/components/Logout";
import { Class } from "@/types";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ClassDetails = () => {
  const { className, classId } = useParams();
  const [classData, setClassData] = useState<Class | null>(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await axios.get(`/api/student/classes/${classId}`);
        console.log(res.data);
        setClassData(res.data.class);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClass();
  }, [classId, className]);

  return (
    <div className="bg-white text-black flex-1">
      {classData && (
        <div>
          <h1>{classData.name}</h1>
          <p>Teacher: {classData.teacher}</p>
        </div>
      )}
      <button className="text-black bg-black p-44" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default ClassDetails;
