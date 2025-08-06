import type { ICellRendererParams } from "ag-grid-community";
import { FiCopy } from "react-icons/fi";
import { handleCopyRows } from "../utils";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";
import { OrderExtended } from "@/types/Order";

export const createCopyButton = (
  gridRef: RefObject<AgGridReact<OrderExtended> | null>
) => {
  return function CopyButton(props: ICellRendererParams<OrderExtended>) {
    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          if (!props.data) return;
          handleCopyRows(gridRef);
        }}
      >
        <FiCopy />
      </button>
    );
  };
};
