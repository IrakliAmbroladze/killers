import { Sheets_Invoice } from "@/types/invoices";
import type { ColDef } from "ag-grid-community";

export const defaultColumnDefs: ColDef<Sheets_Invoice> = {
  filter: true,
  filterParams: { buttons: ["clear"] },
  floatingFilter: true,
  editable: true,
};
