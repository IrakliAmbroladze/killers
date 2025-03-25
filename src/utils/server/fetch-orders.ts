"use server";

const fetchOrders = async () => {
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
    const sliced = data.slice(-1000);

    return sliced;
  } catch (error) {
    console.error(error);
  }
};

export default fetchOrders;
