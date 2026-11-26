import { OrderExtended } from "@/modules/orders/types";
import type { RowSelectionOptions } from "ag-grid-community";

export const rowSelection: RowSelectionOptions<OrderExtended> = {
  mode: "multiRow",
  selectAll: "filtered",
  enableClickSelection: true,
};
