import { fetchOrderById } from "@/lib/supabase/fetchOrderById";

export default async function AcceptanceDocument({
  params,
}: {
  params: Promise<{ order_id: string }>;
}) {
  const { order_id } = await params;
  const order = await fetchOrderById(order_id);
  console.log("order is: ", order);
  return <div>My order id is: {order_id}</div>;
}
