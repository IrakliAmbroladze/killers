"use client";

import { useOrderModal } from "@/context/order-modal-context";
import Modal from "@/components/ui/modal";

const OrderModal = () => {
  const { order, closeOrder } = useOrderModal();

  if (!order) return null;

  return (
    <Modal isOpen={!!order} onClose={closeOrder}>
      <h2>{order.customer}</h2>
      <p>{order.identity}</p>
    </Modal>
  );
};

export default OrderModal;
