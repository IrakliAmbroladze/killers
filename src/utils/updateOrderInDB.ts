import { Sheets_Invoice } from "@/types/invoices";

export const updateOrderInDB = async (updatedOrder: Sheets_Invoice) => {
  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });

    if (!response.ok) {
      throw new Error("Failed to update the backend");
    }

    const data = await response.json();
    console.log("Backend update successful:", data);
  } catch (error) {
    console.error("Error updating order:", error);
  }
};
