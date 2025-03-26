"use server";

const fetchOrders = async (start = 0, limit = 100) => {
  try {
    if (!process.env.SHEETS_URL) {
      throw new Error("SHEETS_URL is not defined");
    }

    const response = await fetch(
      `${process.env.SHEETS_URL}?start=${start}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchOrders;
