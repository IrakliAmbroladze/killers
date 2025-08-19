import type { ICellRendererParams } from "ag-grid-community";
import { updateOrder } from "@/lib";
import { FaRegSave } from "react-icons/fa";
import type { OrderExtended } from "@/types/Order";
import { normalizeOrder } from "../utils/normalize";

export const saveButton = (props: ICellRendererParams<OrderExtended>) => {
  const handleSave = () => {
    const data = props.data;
    if (!data?.id) {
      throw new Error("Order id is absent");
    }

    const updatedOrder = normalizeOrder(data);

    updateOrder(updatedOrder);
  };
  return (
    <button className="cursor-pointer" onClick={handleSave}>
      <FaRegSave />
    </button>
  );
};
