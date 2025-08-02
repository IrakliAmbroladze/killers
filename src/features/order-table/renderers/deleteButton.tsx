import type { AgGridReact } from "ag-grid-react";
import type { ICellRendererParams } from "ag-grid-community";
import type { Sheets_Invoice } from "@/types/invoices";
import { RefObject } from "react";
import { useOrders } from "@/hooks/useOrders";

export const createDeleteButton = (
  gridRef: RefObject<AgGridReact<Sheets_Invoice> | null>
) => {
  return function DeleteButton(props: ICellRendererParams<Sheets_Invoice>) {
    const { deleteOrder } = useOrders();

    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          const confirmDelete = window.confirm(
            `წაიშალოს შემდეგი მონაცემები? \n 
          Identity: ${props.data?.identity} \n 
          Customer: ${props.data?.customer} \n 
          `
          );
          if (confirmDelete && props.data) {
            gridRef.current?.api.applyTransaction({ remove: [props.data] });
            deleteOrder(props.data);
            try {
              fetch("/api/proxy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  order_id: props.data.order_id,
                  status: "delete",
                }),
              });
            } catch (error) {
              console.error(error);
            }
          }
        }}
      >
        🗑️
      </button>
    );
  };
};
