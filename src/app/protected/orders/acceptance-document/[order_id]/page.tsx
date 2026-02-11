import { fetchOrderById } from "@/lib/supabase/fetchOrderById";
import type { OrderExtended } from "@/types";
import AcceptanceDocument from "./AcceptanceDocument";
import { Suspense } from "react";

export default async function AcceptancePage({
  params,
}: {
  params: Promise<{ order_id: string }>;
}) {
  const { order_id } = await params;
  const order: Promise<OrderExtended> = fetchOrderById(order_id);

  return (
    <Suspense fallback={<div>Loading data ... </div>}>
      <AcceptanceDocument orderPromise={order} />
    </Suspense>
  );
}
