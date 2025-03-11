export async function GET() {
  try {
    if (!process.env.SHEETS_URL) {
      throw new Error("SHEETS_URL is not defined");
    }

    const response = await fetch(process.env.SHEETS_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    } else {
      console.error("An uknown error occurred");
    }
  }
}
