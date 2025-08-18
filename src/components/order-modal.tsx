"use client";

import Comments from "@/features/comments/components/comments";
import Modal from "@/components/ui/modal";
import { RxActivityLog } from "react-icons/rx";
import { useOrderModal } from "@/hooks/useOrderModal";
import { OrderExtended } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import TagTechnician from "@/features/TagTechnician/TagTechnician";
import TagPlanTime from "@/features/tag-plan-time/TagPlanTime";
import Done from "@/features/done/Done";

const OrderModal = () => {
  const { openOrderId, closeOrder } = useOrderModal();
  const [order, setOrder] = useState<OrderExtended | null>(null);
  useEffect(() => {
    async function fetchOrder(id: string | null) {
      if (!id) {
        setOrder(null);
        return;
      }
      const supabase = createClient();
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
        *,
        customers (
          id,
          name,
          description
          ),
          payment_types (
            id,
            name
            ),
            providers (
              id,
              name
              ),
              employees (
                id,
                display_name,
                role_id
                )
                `
        )
        .eq("id", id)
        .single();
      if (!error) setOrder(data);
    }
    fetchOrder(openOrderId);
  }, [openOrderId]);
  if (!order) return null;

  return (
    <Modal isOpen={!!order} onClose={closeOrder}>
      <div>
        <div className="text-center pb-2.5">შეკვეთის დეტალები</div>

        <h2>{order.customers.name}</h2>
        <p>ს/კ: {order.customer_id}</p>
        <div>მის: {order.address}</div>
        <div>საკონტაქტო: {order.phone}</div>
        <div>გადახდა: {order.payment_types.name}</div>
        <div>პროცედურა: {order.items}</div>
        <div>შემსრულებელი: {order.providers.name}</div>
        <div>თანხა: {order.price}</div>

        {order.id && <TagPlanTime order_id={order.id} order={order} />}
        <div className="flex justify-between items-center">
          <div className="justify-between items-center">
            ტექნიკოსი:{" "}
            {order.delivery_date ? (
              order.technician
            ) : (
              <TagTechnician order={order} />
            )}
          </div>
          <Done order={order} />
        </div>
        <div>თვე: {order.created_at}</div>
        <div className="flex items-center gap-1.5 pt-5">
          <RxActivityLog /> <span>აქტივობა:</span>
        </div>
        {order.id && <Comments id={order.id} />}
      </div>
    </Modal>
  );
};

export default OrderModal;
