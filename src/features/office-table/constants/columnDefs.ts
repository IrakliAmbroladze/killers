import { Sheets_Invoice } from "@/types/invoices";
import type { ColDef } from "ag-grid-community";
import * as Renderer from "../renderers";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";

export const getColumnDefs = (
  gridRef: RefObject<AgGridReact<Sheets_Invoice> | null>
): ColDef<Sheets_Invoice>[] => {
  const isSmallScreen = window.innerWidth < 768;
  return [
    {
      field: "delete",
      headerName: "D",
      cellRenderer: Renderer.createDeleteButton(gridRef),
      editable: false,
      pinned: isSmallScreen ? undefined : "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<Sheets_Invoice>,
    {
      field: "copy",
      headerName: "C",
      cellRenderer: Renderer.createCopyButton(gridRef),
      editable: false,
      pinned: isSmallScreen ? undefined : "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<Sheets_Invoice>,
    {
      field: "save",
      headerName: "S",
      cellRenderer: Renderer.saveButton,
      editable: false,
      pinned: isSmallScreen ? undefined : "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<Sheets_Invoice>,
    {
      field: "view",
      headerName: "V",
      cellRenderer: Renderer.createViewButton(),
      editable: false,
      pinned: isSmallScreen ? undefined : "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<Sheets_Invoice>,
    {
      field: "date",

      width: 120,
    },
    { field: "customer" },
    {
      field: "identity",
      width: 120,
    },
    { field: "address" },
    {
      field: "payment",
      width: 120,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["გადარიცხვა", "ხელზე"],
      },
    },
    { field: "items" },
    { field: "total", width: 100 },
    {
      field: "provider",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["405049923 LTD KILL (VAT)", "405140217 LTD KILLER"],
      },
    },
    { field: "seller" },
    { field: "phone", width: 100 },
    { field: "email" },
    {
      field: "delivery_date",
    },
    { field: "technician", editable: false },
    { field: "document" },
    { field: "order_id", editable: false },
    { field: "plan_time", editable: false },
    { field: "approve", editable: false },
  ];
};
