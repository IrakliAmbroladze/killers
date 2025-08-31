import { NextResponse } from "next/server";
import { getCommentsQuantities } from "@/lib/getCommentsQuantities";
import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    console.log("Authenticated request from:", user?.email);
    const commentsQuantities = await getCommentsQuantities();
    return NextResponse.json(commentsQuantities);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Unknown server error" },
      { status: 500 }
    );
  }
}
