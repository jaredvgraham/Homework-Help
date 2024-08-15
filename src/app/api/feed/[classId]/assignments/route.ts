import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/PostModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { classId: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {
        error: "You must be signed in to view this page.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    await connectToDatabase();
    const { classId } = params;
    const assignments = await Post.find({
      class: classId,
      postType: "assignment",
    });
    console.log("assignments are:", assignments);
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
    return NextResponse.json(assignments, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
