"use client";

import { Class } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [classes, setClasses] = useState<Class[]>([]); // You can replace 'any' with a more specific type if you know the shape of your data.

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
      } catch (error) {
        console.log(error);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="bg-white text-black">
      {classes &&
        classes.map((studentClass) => (
          <div key={studentClass._id}>
            <h1>{studentClass.name}</h1>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
