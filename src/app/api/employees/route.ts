import { NextResponse } from "next/server";
import { getEmployees } from "@/lib/getEmployees";

export async function GET() {
  try {
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
