import { Sheets_Invoice } from "@/types/invoices";

export const filterByMonth = (orders: Sheets_Invoice[], month: number) => {
  return orders.filter((order) => {
    const rawDate = order.date;
    let orderDate: Date | null = null;

    if (/^\d{6}$/.test(rawDate)) {
      // Format: YYYYMM
      const year = parseInt(rawDate.slice(0, 4), 10);
      const monthNum = parseInt(rawDate.slice(4, 6), 10) - 1; // JS months are 0-based
      orderDate = new Date(year, monthNum);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      // Format: YYYY-MM-DD
      orderDate = new Date(rawDate);
    } else {
      console.warn("Unrecognized date format:", rawDate);
      return false; // skip invalid format
    }

    return orderDate.getMonth() === month; // 0-indexed month
  });
};
