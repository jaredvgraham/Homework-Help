import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/UserModel";
import Assignment from "@/models/AssignmentModel";
import Question from "@/models/QuestionModel";
import { NextRequest, NextResponse } from "next/server";

interface AssignmentResponseObj {
  title: string;
  description: string;
  class: string;
  dueDate: Date;
  questions: Array<typeof Question>;
}

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {
        error: "You must be signed in to get assignments",
      },
      {
        status: 401,
      }
    );
  }
  if (session.user.role !== "teacher") {
    return NextResponse.json(
      {
        error: "You must be a teacher to get assignments",
      },
      {
        status: 400,
      }
    );
  }
  try {
    await connectToDatabase();
    const teacher = await User.findOne({ email: session.user.email });
    if (!teacher) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    const assignments = await Assignment.find({ teacher: teacher._id });
    if (!assignments) {
      return NextResponse.json(
        {
          error: "No assignments found",
        },
        {
          status: 404,
        }
      );
    }
    console.log("assignments are:", assignments);

    return NextResponse.json({ assignments }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
