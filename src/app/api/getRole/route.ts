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

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to view this page." },
      { status: 401 }
    );
  }

  const { role } = await req.json();

  if (!role) {
    return NextResponse.json({ error: "Role is required." }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { role },
      { new: true }
    );

    return NextResponse.json(user.role);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
