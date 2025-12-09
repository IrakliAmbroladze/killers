import { LogoWhiteOnBlue } from "@/components/atoms/logoWhiteOnBlue";
import { fetchOrderById } from "@/lib/supabase/fetchOrderById";
import { getTodaysYYYY_MM_DDString } from "@/utils/calendar/getTodaysString";

export default async function AcceptanceDocument({
  params,
}: {
  params: Promise<{ order_id: string }>;
}) {
  const { order_id } = await params;
  const order = await fetchOrderById(order_id);

  return (
    <div className="flex justify-center items-center flex-col">
      <LogoWhiteOnBlue />
      <h1>მიღება-ჩაბარების აქტი</h1>
      <input type="date" defaultValue={getTodaysYYYY_MM_DDString()} />
      My order id is: {order.customers.name}
    </div>
  );
}
