import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import Assignment from "@/models/AssignmentModel";
import { NextRequest, NextResponse } from "next/server";

interface AssignAssignment {
  classId: string;
  dueDate: Date;
}

interface AssignAssignmentRequest {
  assignmentId: string;
  classes: AssignAssignment[];
}

export async function PUT(req: NextRequest) {
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
    const body: AssignAssignmentRequest = await req.json();
    const { assignmentId, classes } = body;
    console.log("body is thisssss:", body);

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }
    assignment.class = classes;
    await assignment.save();
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
