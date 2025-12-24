import { fetchOrderById } from "@/lib/supabase/fetchOrderById";
import { OrderExtended } from "@/types";
import AcceptanceDocument from "./AcceptanceDocument";

export default async function AcceptancePage({
  params,
}: {
  params: Promise<{ order_id: string }>;
}) {
  const { order_id } = await params;
  const order: OrderExtended = await fetchOrderById(order_id);

  return <AcceptanceDocument order={order} />;
}
