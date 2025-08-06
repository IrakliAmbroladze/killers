import { Order, OrderExtended } from "@/types/Order";

export const normalizeAgGridRowForCopy = (row: OrderExtended) => {
  const {
    id,
    created_at,
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
    created_at,
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
    | "id"
    | "created_at"
    | "delivery_date"
    | "technician"
    | "document"
    | "plan_time"
    | "approve"
  > & { id: string } = {
    ...plainOrder,
    id: crypto.randomUUID(),
  };
  return newOrder;
};
