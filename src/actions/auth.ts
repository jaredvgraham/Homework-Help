import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/UserModel";

export const getRole = async (): Promise<string | null> => {
  const session = await auth();
  if (!session) {
    return null;
  }
  try {
    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });
    return user.role;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};
