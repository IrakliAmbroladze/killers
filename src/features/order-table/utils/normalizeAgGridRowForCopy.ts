import { Order, OrderExtended } from "@/types/Order";

export const normalizeAgGridRowForCopy = (
  row: OrderExtended,
  date = new Date().toISOString().split("T")[0]
) => {
  const {
    id,
    customers,
    providers,
    employees,
    payment_types,
    delivery_date,
    technician,
    document,
    plan_time,
    approve,
    ...plainOrder
  } = row as OrderExtended;
  console.log(
    "removed ",
    id,
    customers,
    providers,
    employees,
    payment_types,
    delivery_date,
    technician,
    document,
    plan_time,
    approve,
    "for preparing order to be copied"
  );

  const newOrder: Omit<
    Order,
    "id" | "delivery_date" | "technician" | "document" | "plan_time" | "approve"
  > & { id: string } = {
    ...plainOrder,
    id: crypto.randomUUID(),
    created_at: date,
  };
  return newOrder;
};
