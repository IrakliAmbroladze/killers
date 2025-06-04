"use client";

import Comments from "@/features/comments/comments";
import Modal from "@/components/ui/modal";
import { RxActivityLog } from "react-icons/rx";
import { useOrderModal } from "@/hooks/useOrderModal";
import TagTechnician from "@/features/TagTechnician/TagTechnician";
import { Sheets_Invoice } from "@/types/invoices";
import { useOrders } from "@/hooks/useOrders";
import TagPlanTime from "@/features/tag-plan-time/TagPlanTime";
import Done from "@/features/done/Done";

const OrderModal = () => {
  const { openOrderId, closeOrder } = useOrderModal();
  const { orders } = useOrders();
  const order = orders.find((o: Sheets_Invoice) => o.order_id === openOrderId);
  if (!order) return null;

  return (
    <Modal isOpen={!!order} onClose={closeOrder}>
      <div>
        <div className="text-center pb-2.5">შეკვეთის დეტალები</div>

        <h2>{order.customer}</h2>
        <p>ს/კ: {order.identity}</p>
        <div>მის: {order.address}</div>
        <div>საკონტაქტო: {order.phone}</div>
        <div>გადახდა: {order.payment}</div>
        <div>პროცედურა: {order.items}</div>
        <div>შემსრულებელი: {order.provider}</div>
        <div>თანხა: {order.total}</div>

        {order.order_id && <TagPlanTime order_id={order.order_id} />}
        <div className="flex justify-between items-center">
          <div className="justify-between items-center">
            ტექნიკოსი:{" "}
            {order.delivery_date
              ? order.technician
              : order.order_id && <TagTechnician order_id={order.order_id} />}
          </div>
          {order.order_id && <Done order_id={order.order_id} />}
        </div>
        <div>თვე: {order.date}</div>
        <div className="flex items-center gap-1.5 pt-5">
          <RxActivityLog /> <span>აქტივობა:</span>
        </div>
        {order.order_id && <Comments id={order.order_id} />}
      </div>
    </Modal>
  );
};

export default OrderModal;
