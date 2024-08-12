"use client";
import axios from "axios";
import React, { useEffect } from "react";

const End = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = axios.get("http://localhost:3000/api/test");
      console.log(res);
    };
    fetchData();
  }, []);

  return <div>End</div>;
};

export default End;
