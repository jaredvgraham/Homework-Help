import { useRouter } from "next/navigation";

export default function ChooseRole() {
  const router = useRouter();

  const handleRegisterSchool = () => {
    router.push("/register-school");
  };

  const handleContinueSolo = async () => {
    const response = await fetch("/api/update-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "solo" }),
    });

    if (response.ok) {
      router.push("/dashboard"); // Redirect to the dashboard or home page
    } else {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Choose Your Role</h1>
      <button onClick={handleRegisterSchool}>Register a School</button>
      <button onClick={handleContinueSolo}>Continue as Solo Student</button>
    </div>
  );
}
