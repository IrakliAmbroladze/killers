"use client";

import Comments from "@/features/comments/components/comments";
import Modal from "@/components/ui/modal";
import { RxActivityLog } from "react-icons/rx";
import { useOrderModal } from "@/hooks/useOrderModal";
import { useCommentsQuantities } from "@/hooks/useCommentsQuantities";
import TechniciansOrder from "./technicians-order";

const OrderModal = () => {
  const { openOrderId, closeOrder, order } = useOrderModal();
  const { commentsQuantities } = useCommentsQuantities();
  if (!order) return null;

  return (
    <Modal isOpen={!!openOrderId} onClose={closeOrder}>
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

        <TechniciansOrder
          order={order}
          comments_num={commentsQuantities[order.id] ?? 0}
          isInModal={true}
        />
        <div className="flex items-center gap-1.5 pt-5">
          <RxActivityLog /> <span>აქტივობა:</span>
        </div>
        {order.id && <Comments id={order.id} />}
      </div>
    </Modal>
  );
};

export default OrderModal;
