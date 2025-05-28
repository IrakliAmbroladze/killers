import { Sheets_Invoice } from "@/types/invoices";

// export const filterCurrentMonth = (orders: Sheets_Invoice[]) => {
//   const today = new Date().toISOString().split("T")[0];
//   const CurrYearMonth = today.slice(0, 4) + today.slice(5, 7);
//   const filteredOrders = orders.filter(
//     (order) => String(order.date) === String(CurrYearMonth)
//   );
//   return filteredOrders;
// };

export const filterCurrentMonth = (orders: Sheets_Invoice[]) => {
  const now = new Date();
  const currentYearMonth = `${now.getFullYear()}${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  return orders.filter((order) => {
    const rawDate = order.date;

    // Normalize to YYYYMM regardless of format
    let orderYearMonth = "";

    if (/^\d{6}$/.test(rawDate)) {
      // Already in YYYYMM format
      orderYearMonth = rawDate;
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      // Format: YYYY-MM-DD
      const dateObj = new Date(rawDate);
      orderYearMonth = `${dateObj.getFullYear()}${String(
        dateObj.getMonth() + 1
      ).padStart(2, "0")}`;
    } else {
      console.warn("Unrecognized date format:", rawDate);
      return false; // skip invalid format
    }

    return orderYearMonth === currentYearMonth;
  });
};
