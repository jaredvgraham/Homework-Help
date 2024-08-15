//get class assignments
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import Assignment from "@/models/AssignmentModel";
import Class from "@/models/ClassModel";

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

  try {
    await connectToDatabase();
    const { classId } = params;
    const classIs = await Class.findById(classId);
    if (!classIs) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }
    const assignmentIds = classIs.assignments;
    const assignments = await Assignment.find({ _id: { $in: assignmentIds } });
    console.log("assignments are:", assignments);

    return NextResponse.json(assignments);
  } catch (error) {
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
