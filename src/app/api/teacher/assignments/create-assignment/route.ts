import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import Assignment from "@/models/AssignmentModel";

type options = {
  id: string;
  text: string;
};

interface CreateAssignmentRequest {
  details: {
    title: string;
    description: string;
    class: string;
    dueDate: Date;
  };
  youtubeLinks: string[];
  questions: Array<{
    questionText: string;
    options: options[];
    correctChoice: string;
  }>;
}

export async function POST(req: NextRequest) {
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
    const body: CreateAssignmentRequest = await req.json();

    const {
      details: { title, description, class: classId, dueDate },
      questions,
      youtubeLinks,
    } = body;

    const studentIds = await User.find({
      classes: classId,
      role: "student",
    }).select("_id");
    if (!studentIds) {
      return NextResponse.json({ error: "No students found" }, { status: 404 });
    }

    console.log("questions:", questions);

    const embeddedQuestions = questions.map((q) => ({
      question: q.questionText,
      options: q.options,
      answer: q.correctChoice,
    }));

    const assignment = new Assignment({
      title,
      description,
      class: classId,
      teacher: user._id,
      students: studentIds,
      youtubeLinks,
      dueDate,
      questions: embeddedQuestions, // Embed questions directly
    });

    await assignment.save();

    return NextResponse.json(
      { message: "Assignment created" },
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
