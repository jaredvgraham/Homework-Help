import React from "react";
import Landing from "./landing/page";
import { SignOut } from "@/components/Logout";
import CheckS from "@/components/CheckS";
import LoginLogoutButton from "@/components/LoginOrOut";
import End from "@/components/End";

const page = () => {
  return (
    <>
      <Landing />
      <LoginLogoutButton />
      <End />
    </>
  );
};

export default page;
