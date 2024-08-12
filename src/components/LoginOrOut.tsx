"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

const LoginLogoutButton = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div>
      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn("google")}>Sign In</button>
      )}
    </div>
  );
};

export default LoginLogoutButton;
