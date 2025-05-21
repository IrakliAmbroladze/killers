import type { Sheets_Invoice } from "@/types/invoices";

const openOrderAction = (order: Sheets_Invoice) => ({
  type: "OPEN_ORDER" as const,
  payload: order,
});

const closeOrderAction = () => ({ type: "CLOSE_ORDER" as const });

const setOrderAction = (order: Sheets_Invoice) => ({
  type: "SET_ORDER" as const,
  payload: order,
});

export { openOrderAction, closeOrderAction, setOrderAction };
