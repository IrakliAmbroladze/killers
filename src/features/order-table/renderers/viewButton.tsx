import type { ICellRendererParams } from "ag-grid-community";
import { useOrderModal } from "@/hooks/useOrderModal";
import { RxEyeOpen } from "react-icons/rx";
import { OrderExtended } from "@/types";

export const createViewButton = () => {
  return function ViewButton(props: ICellRendererParams<OrderExtended>) {
    const { openOrder } = useOrderModal();

    const handleView = (orderId: string) => {
      openOrder(orderId);
    };

    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          if (props.data?.id) handleView(props.data.id);
        }}
      >
        <RxEyeOpen />
      </button>
    );
  };
};
