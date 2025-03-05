export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxKT3RKa5O8yZjAaRXcjMqNxaf0lAKHJxMraqj5XXvM6y9pdZ_VEHU3XnnxG8a-bw7K/exec",
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
