import type { GridApi, ICellRendererParams } from "ag-grid-community";
import { OrderExtended } from "@/types";
import { confirDeletePrompt } from "@/utils";

export const useDeleteButton = ({
  props,
  api,
}: {
  props: ICellRendererParams<OrderExtended>;
  api: GridApi<OrderExtended>;
}) => {
  const handleDelete = () => {
    if (!props.data) return;

    const id = props.data.customer_id;
    const name = props.data.customers.name;
    if (confirDeletePrompt(id, name)) {
      api.applyTransaction({ remove: [props.data] });
      // try {
      //   fetch("/api/proxy", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       order_id: props.data.order_id,
      //       status: "delete",
      //     }),
      //   });
      // } catch (error) {
      //   console.error(error);
      // }
    }
  };

  return { handleDelete };
};
