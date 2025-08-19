import type { AgGridReact } from "ag-grid-react";
import type { ICellRendererParams } from "ag-grid-community";
import { RefObject } from "react";
import { OrderExtended } from "@/types";
import { confirDeletePrompt } from "@/utils";
import { deleteOrders } from "@/lib";

export const createDeleteButton = (
  gridRef: RefObject<AgGridReact<OrderExtended> | null>
) => {
  return function DeleteButton(props: ICellRendererParams<OrderExtended>) {
    if (!gridRef.current) {
      console.warn("no AgGrid reference ");
      return;
    }
    const { api } = gridRef.current;
    const { data } = props;
    if (!data) {
      console.warn("no data ");
      return;
    }

    const handleDelete = async () => {
      const { customer_id } = data;
      const { name } = data.customers;
      if (confirDeletePrompt(customer_id, name)) {
        api.applyTransaction({ remove: [data] });
        try {
          const response = await deleteOrders([data.id]);
          console.log(response.message);
        } catch (error) {
          console.error(error);
        }
      }
    };
    return (
      <button className="cursor-pointer" onClick={handleDelete}>
        🗑️
      </button>
    );
  };
};
