import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { getEmployees } from "@/lib/getEmployees";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    console.log("Authenticated request from:", user.email);
    const employees = await getEmployees();

    return NextResponse.json(employees);
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
