import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import Class from "@/models/ClassModel";

export async function GET(req: NextRequest) {
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
    if (user.role !== "student") {
      return NextResponse.json(
        { error: "You must be a student" },
        { status: 400 }
      );
    }
    const studentClassIds = user.classes;
    let studentClasses: any[] = [];
    for (let i = 0; i < studentClassIds.length; i++) {
      const studentClass = await Class.findById(studentClassIds[i]);
      if (studentClass) {
        studentClasses.push(studentClass);
      }
    }
    return NextResponse.json({ classes: studentClasses }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
