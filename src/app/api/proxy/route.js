export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwOlKY1u7ms6Ca4tjimXQB5JqJ-KNvsWSYkr5fmePgaXVuB9BEm--4s6SELEIOmtjiWPQ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

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
