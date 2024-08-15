import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/PostModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    const body = await req.json();
    console.log("body is thisssss:", body);
    const { message, classId } = body;
    console.log("classId is this:", classId);
    console.log("message is this:", message);
    const post = new Post({
      message: message,
      postType: "announcement",
      class: classId,
    });
    await post.save();
    return NextResponse.json(
      { message: "Announcement created successfully" },
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
