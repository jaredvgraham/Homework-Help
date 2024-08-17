import { signIn } from "@/auth";
import { SignOut } from "./Logout";
import { getRole } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const role = await getRole();
  if (role) {
    if (role === "student") {
      redirect("/student");
    } else if (role === "teacher") {
      redirect("/teacher");
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 md:p-12 lg:p-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Homework Help
          </h1>
          <p className="text-gray-600">
            Join our platform and get the help you need to excel in your
            studies.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <img
            src="/images/education_illustration.svg"
            alt="Education Illustration"
            className="w-3/4 h-auto"
          />
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Sign in with Google
          </button>
        </form>
        <SignOut />
      </div>
    </div>
  );
}
