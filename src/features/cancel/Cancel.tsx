import { OrderExtended } from "@/types";
import React, { JSX, useEffect, useState } from "react";
import { normalizeOrder } from "../order-table/utils/normalize";
import { editOrder } from "@/lib";
import { proceduresPathName } from "@/app/protected/procedures/constants/proceduresPathName";
import { useOrderModal } from "@/hooks/useOrderModal";

const Cancel = ({
  order,
  isInModal,
}: {
  order: OrderExtended;
  isInModal: boolean;
}): JSX.Element => {
  const { refreshOrder } = useOrderModal();

  const [cancelOrder, setCancelOrder] = useState<boolean>(false);

  useEffect(() => {
    if (order?.cancel) {
      setCancelOrder(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCacel = async () => {
    const newStatus = !cancelOrder;
    setCancelOrder(newStatus);
    const updatedOrder = normalizeOrder({
      ...order,
      cancel: newStatus ? true : false,
      created_at: order?.created_at ?? "", // Ensure date is always a string
    });

    const result = await editOrder(updatedOrder, proceduresPathName);

    if (result.status === "OK" && isInModal) {
      await refreshOrder(order.id); // fetch updated order and update context
    }
  };

  if (!order) return <div>Order not found</div>;

  return (
    <button
      onClick={handleCacel}
      className="text-xs active:scale-90 ease-in-out transition-transform duration-150 border rounded-full px-1 mx-2"
    >
      X
    </button>
  );
};

export default Cancel;
