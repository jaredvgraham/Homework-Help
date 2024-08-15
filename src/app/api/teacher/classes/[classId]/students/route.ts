import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { classId: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to view this page." },
      { status: 401 }
    );
  }

  if (session.user.role !== "teacher") {
    return NextResponse.json(
      { error: "You must be a teacher" },
      { status: 400 }
    );
  }
  try {
    await connectToDatabase();
    const { classId } = params;
    console.log("classId is this:", classId);
    const students = await User.find({ classes: classId, role: "student" });
    if (!students) {
      return NextResponse.json({ error: "No students found" }, { status: 404 });
    }
    return NextResponse.json(students, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
