import type { ICellRendererParams } from "ag-grid-community";
import type { Sheets_Invoice } from "@/types/invoices";
import { FiCopy } from "react-icons/fi";
import { useOrders } from "@/hooks/useOrders";
import { handleCopyRows } from "../utils";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";

export const createCopyButton = (
  gridRef: RefObject<AgGridReact<Sheets_Invoice> | null>
) => {
  return function CopyButton(props: ICellRendererParams<Sheets_Invoice>) {
    const { addOrder } = useOrders();

    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          if (!props.data) return;
          handleCopyRows(addOrder, gridRef);
        }}
      >
        <FiCopy />
      </button>
    );
  };
};
