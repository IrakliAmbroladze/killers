import type { RowSelectionOptions } from "ag-grid-community";
import { OrderExtended } from "@/types/Order";

export const rowSelection: RowSelectionOptions<OrderExtended> = {
  mode: "multiRow",
  selectAll: "filtered",
  enableClickSelection: true,
};
