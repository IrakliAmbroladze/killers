import { Sheets_Invoice } from "@/types/invoices";

export const filterCurrentMonth = (orders: Sheets_Invoice[]) => {
  const today = new Date().toISOString().split("T")[0];
  const CurrYearMonth = today.slice(0, 4) + today.slice(5, 7);
  const filteredOrders = orders.filter(
    (order) => String(order.date) === String(CurrYearMonth)
  );
  return filteredOrders;
};
