import { Sheets_Invoice } from "@/types/invoices";

export const filterByYearMonth = (
  orders: Sheets_Invoice[],
  targetYear: number,
  targetMonth: number // 0-indexed: Jan = 0, Dec = 11
) => {
  return orders.filter((order) => {
    const rawDate = order.date;
    let orderDate: Date | null = null;

    if (/^\d{6}$/.test(rawDate)) {
      // Format: YYYYMM
      const year = parseInt(rawDate.slice(0, 4), 10);
      const month = parseInt(rawDate.slice(4, 6), 10) - 1;
      orderDate = new Date(year, month);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      // Format: YYYY-MM-DD
      orderDate = new Date(rawDate);
    } else {
      console.warn("Unrecognized date format:", rawDate);
      return false; // skip invalid format
    }

    return (
      orderDate.getFullYear() === targetYear &&
      orderDate.getMonth() === targetMonth
    );
  });
};
