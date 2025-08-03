import type { ICellRendererParams } from "ag-grid-community";
import { updateOrder } from "@/lib";
import { FaRegSave } from "react-icons/fa";
import { OrderExtended } from "@/types/Order";

export const saveButton = (props: ICellRendererParams<OrderExtended>) => {
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        if (props.data?.id) updateOrder(props.data);
      }}
    >
      <FaRegSave />
    </button>
  );
};
