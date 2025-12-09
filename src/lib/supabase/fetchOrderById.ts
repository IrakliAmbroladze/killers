import { createClient } from "@/utils/supabase/server";
import { OrderExtended } from "@/types/Order";
export const fetchOrderById = async (
  id: string,
): Promise<{
  order: OrderExtended;
}> => {
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
        *,
        customers (id, name, description, contractor),
        payment_types (id, name),
        providers (id, name),
        employees (id, display_name, role_id)
        `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    throw new Error("Error while fetching an order");
  }

  return order;
};
