export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connect } from "@/config/mongose";
import Resume from "@/models/resumes";
import User from "@/models/users";
import { getServerAccount } from "@/config/appwrite-server";

export async function GET(req: Request) {
  try {
    // 🔐 Extract JWT
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const jwt = authHeader.replace("Bearer ", "");

    // 🔐 Get current Appwrite user
    const account = getServerAccount(jwt);
    const appwriteUser = await account.get();

    await connect();

    // 🔎 Find Mongo user
    const user = await User.findOne({
      appwriteUserId: appwriteUser.$id
    });

    if (!user) {
      return NextResponse.json({ resume: null });
    }

    // 🔎 Get latest resume
    const resume = await Resume.findOne({
      appwriteUserId: appwriteUser.$id
    }).sort({ createdAt: -1 });

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("Check resume error:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}
