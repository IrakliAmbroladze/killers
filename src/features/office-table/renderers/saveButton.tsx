import type { ICellRendererParams } from "ag-grid-community";
import type { Sheets_Invoice } from "@/types/invoices";
import { updateOrderInDB } from "@/utils/updateOrderInDB";
import { FaRegSave } from "react-icons/fa";

export const saveButton = (props: ICellRendererParams<Sheets_Invoice>) => {
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        if (props.data?.order_id) updateOrderInDB(props.data);
        alert("✅ მონაცემი შეინახა");
      }}
    >
      <FaRegSave />
    </button>
  );
};
