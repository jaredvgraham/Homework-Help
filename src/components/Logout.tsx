import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div>
      <h1>Sign out of Your Account</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
