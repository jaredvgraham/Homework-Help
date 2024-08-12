"use client";
import { useSession } from "next-auth/react";
import React from "react";

const CheckS = () => {
  const { data: session } = useSession();
  if (!session) return <p>Not signed in</p>;
  return <p>Signed in as {session.user?.email}</p>;
};

export default CheckS;
