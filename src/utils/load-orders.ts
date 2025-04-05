import { Sheets_Invoice } from "@/types/invoices";
import fetchOrders from "@/utils/server/fetch-orders";

export const loadOrders = async (
  setLoading: (loading: boolean) => void,
  start: number,
  limit: number,
  setInvoices: (
    invoices: Sheets_Invoice[] | ((prev: Sheets_Invoice[]) => Sheets_Invoice[])
  ) => void
) => {
  try {
    setLoading(true);
    const newInvoices: Sheets_Invoice[] = await fetchOrders(start, limit);

    setInvoices((prev: Sheets_Invoice[]) => [...prev, ...newInvoices]);
  } catch (error) {
    console.error("Error loading orders:", error);
  } finally {
    setLoading(false);
  }
};
