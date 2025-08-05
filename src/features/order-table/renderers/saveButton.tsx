import type { ICellRendererParams } from "ag-grid-community";
import { updateOrder } from "@/lib";
import { FaRegSave } from "react-icons/fa";
import type { OrderExtended, Order } from "@/types/Order";

export const saveButton = (props: ICellRendererParams<OrderExtended>) => {
  const handleSave = () => {
    if (!props.data?.id) {
      throw new Error("Order id is abscent");
    }

    const updatedOrder: Partial<OrderExtended> = { ...props.data };

    delete updatedOrder.customers;
    delete updatedOrder.payment_types;
    delete updatedOrder.providers;
    delete updatedOrder.employees;
    updateOrder(updatedOrder as Order);
  };

  return (
    <button className="cursor-pointer" onClick={handleSave}>
      <FaRegSave />
    </button>
  );
};
