import type { ICellRendererParams } from "ag-grid-community";
import type { Sheets_Invoice } from "@/types/invoices";
import { useOrderModal } from "@/hooks/useOrderModal";
import { RxEyeOpen } from "react-icons/rx";

export const createViewButton = () => {
  return function ViewButton(props: ICellRendererParams<Sheets_Invoice>) {
    const { openOrder } = useOrderModal();

    const handleView = (orderId: string) => {
      openOrder(orderId);
    };

    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          if (props.data?.order_id) handleView(props.data.order_id);
        }}
      >
        <RxEyeOpen />
      </button>
    );
  };
};
