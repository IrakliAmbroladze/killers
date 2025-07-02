import { NextResponse } from "next/server";
import fetchOrders from "@/utils/server/fetch-orders";
import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    console.log("Authenticated request from:", user.email);
    const orders = await fetchOrders();

    return NextResponse.json(orders);
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
