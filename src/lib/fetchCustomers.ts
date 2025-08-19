import type { Customer } from "@/types/Customer";

export const fetchCustomers = async (
  id: string,
  mode: "exact" | "search" = "search"
): Promise<Customer[] | null> => {
  try {
    console.log("start of fetchCustomers");

    const res = await fetch(
      `/api/orders/fetchCustomers?id=${encodeURIComponent(id)}&mode=${mode}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );

    if (!res.ok) {
      console.error(`HTTP error: ${res.status}`);
      return null;
    }

    const {
      success,
      data,
      error,
    }: {
      success: boolean;
      data: Customer[];
      error?: string;
    } = await res.json();

    if (success) {
      return data;
    } else {
      console.error("❌ შეცდომა:", error);
      return null;
    }
  } catch (err) {
    console.error("❌ Network error:", err);
    return null;
  }
};
