import { OrderExtended } from "@/types/Order";
import type { ColDef } from "ag-grid-community";

export const defaultColumnDefs: ColDef<OrderExtended> = {
  filter: true,
  filterParams: { buttons: ["clear"] },
  floatingFilter: true,
  editable: true,
};
