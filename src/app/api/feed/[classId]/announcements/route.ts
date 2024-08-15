import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/PostModel";

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
    console.log("classId is:", classId);
    const posts = await Post.find({ class: classId, postType: "announcement" });
    if (!posts) {
      return NextResponse.json({ error: "No posts found" }, { status: 404 });
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
