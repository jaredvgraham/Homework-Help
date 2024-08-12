"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Register = () => {
  const router = useRouter();

  const handleRegisterSchool = async () => {
    try {
      const res = await axios.post("/api/getRole", { role: "admin" });
      router.push("/admin/register-school");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSoloStudent = async () => {
    try {
      const res = await axios.post("/api/getRole", { role: "solo" });
      router.push("/solo/register-student");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to Homework Help
        </h1>
        <p className="mb-8 text-center">
          Please choose one of the options below to get started:
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleRegisterSchool}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Register a School
          </button>
          <button
            onClick={handleSoloStudent}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Be a Solo Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
