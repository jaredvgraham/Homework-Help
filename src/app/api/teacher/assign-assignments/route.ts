import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import Assignment from "@/models/AssignmentModel";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/PostModel";
import Class from "@/models/ClassModel";

interface AssignAssignment {
  classId: string;
  dueDate: Date;
}

interface AssignAssignmentRequest {
  message: string;
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
    const { message, assignmentId, classes } = body;
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

    const post = new Post({
      message: message,
      postType: "assignment",
      assignment: assignment._id,
      classes: classes.map((c) => c.classId),
      dueDate: assignment.class[0].dueDate,
    });

    await post.save();

    classes.forEach(async (c) => {
      const clasS = await Class.findById(c.classId);
      if (!clasS) {
        return NextResponse.json({ error: "Class not found" }, { status: 404 });
      }
      clasS.assignments.push(assignment._id);
      await clasS.save();
    });

    return NextResponse.json(
      { message: "Assignment assigned successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
