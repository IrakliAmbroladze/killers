// lib/normalize.ts
import type { Order, OrderExtended } from "@/types/Order";

export function normalizeOrder(order: Partial<OrderExtended>): Partial<Order> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { customers, payment_types, providers, employees, ...rest } = order;

  return {
    ...rest,
    price:
      typeof rest.price === "string"
        ? parseInt(rest.price, 10)
        : Number(rest.price),
    payment_type_id:
      typeof rest.payment_type_id === "string"
        ? parseInt(rest.payment_type_id, 10)
        : rest.payment_type_id,
    provider_id:
      typeof rest.provider_id === "string"
        ? parseInt(rest.provider_id, 10)
        : rest.provider_id,
  };
}
