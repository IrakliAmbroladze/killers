// lib/normalize.ts
import type { Order, OrderExtended } from "@/types/Order";

export function normalizeOrder(order: Partial<OrderExtended>): Partial<Order> {
  const { customers, payment_types, providers, employees, ...normalized } =
    order;

  console.log(
    "removed from order to normalize: ",
    customers,
    payment_types,
    providers,
    employees
  );

  return normalized;
}
