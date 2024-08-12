import { NextRequest, NextResponse } from "next/server";

import connectToDatabase from "@/lib/mongodb";
import User from "@/models/UserModel";
import { auth } from "@/auth";

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

    return NextResponse.json(user.role);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
