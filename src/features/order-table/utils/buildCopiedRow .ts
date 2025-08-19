import { Sheets_Invoice } from "@/types/invoices";

export const buildCopiedRow = (
  original: Sheets_Invoice,
  userInputDate: string
): Sheets_Invoice => {
  return {
    ...original,
    order_id: crypto.randomUUID(),
    delivery_date: "",
    technician: "",
    document: "",
    plan_time: "",
    approve: "",
    date: userInputDate,
    customer: original.customer ?? "",
    identity: original.identity ?? "",
    address: original.address ?? "",
    payment: original.payment ?? "",
    items: original.items ?? "",
    total: original.total ?? "",
    provider: original.provider ?? "",
    seller: original.seller ?? "",
    phone: original.phone ?? "",
    email: original.email ?? "",
  };
};
