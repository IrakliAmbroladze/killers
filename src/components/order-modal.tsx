"use client";

import Comments from "@/components/comments/comments";
import Modal from "@/components/ui/modal";
import { RxActivityLog } from "react-icons/rx";
import CheckBoxOfPlanned from "@/components/ui/CheckBoxOfPlanned";
import { useOrderModal } from "@/hooks/useOrderModal";
import TagTechnician from "@/features/TagTechnician/TagTechnician";
import { Sheets_Invoice } from "@/types/invoices";
import { useOrders } from "@/hooks/useOrders";

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
        <div>
          {order.order_id && <TagTechnician order_id={order.order_id} />}
        </div>
        <label>
          {order.order_id && <CheckBoxOfPlanned order_id={order.order_id} />}
          დაგეგმილი
        </label>
        <div className="flex items-center gap-1.5 pt-5">
          <RxActivityLog /> <span>აქტივობა:</span>
        </div>
        {order.order_id && <Comments id={order.order_id} />}
      </div>
    </Modal>
  );
};

export default OrderModal;
