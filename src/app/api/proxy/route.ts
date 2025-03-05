import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!process.env.SHEETS_URL) {
      throw new Error("SHEETS_URL is not defined");
    }
    const response = await fetch(process.env.SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    return new Response(JSON.stringify({ message: text }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to send request" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
