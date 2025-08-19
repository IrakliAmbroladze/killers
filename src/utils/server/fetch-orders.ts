"use server";

const fetchOrders = async (start = 0, limit = 10000) => {
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

    const data = await response.json();
    console.log("Fetched orders:", data?.length);
    return data;
  } catch (error) {
    console.error("error in fetchOrders:", error);
    console.error(error);
    return [];
  }
};

export default fetchOrders;
