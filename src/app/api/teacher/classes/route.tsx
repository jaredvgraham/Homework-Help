//get teacher classes

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/UserModel";
import Class from "@/models/ClassModel";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to view this page." },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (user.role !== "teacher") {
      return NextResponse.json(
        { error: "You must be a teacher" },
        { status: 400 }
      );
    }
    const classes = await Class.find({ teacher: user._id });
    console.log("classes are:", classes);

    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
