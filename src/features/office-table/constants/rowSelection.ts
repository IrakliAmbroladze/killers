import type { RowSelectionOptions } from "ag-grid-community";
import { Sheets_Invoice } from "@/types/invoices";

export const rowSelection: RowSelectionOptions<Sheets_Invoice> = {
  mode: "multiRow",
  selectAll: "filtered",
  enableClickSelection: true,
};
