//screen size

import type { ColDef } from "ag-grid-community";
// import * as Renderer from "../renderers";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";
import { OrderExtended } from "@/types/Order";

export const getColumnDefs = (
  gridRef: RefObject<AgGridReact<OrderExtended> | null>
): ColDef<OrderExtended>[] => {
  console.log("gridRef is: ", gridRef);
  return [
    // {
    //   field: "delete",
    //   headerName: "D",
    //   cellRenderer: Renderer.createDeleteButton(gridRef),
    //   editable: false,
    //   pinned: "left",
    //   filter: false,
    //   width: 50,
    // } as unknown as ColDef<OrderExtended>,
    // {
    //   field: "copy",
    //   headerName: "C",
    //   cellRenderer: Renderer.createCopyButton(gridRef),
    //   editable: false,
    //   pinned: "left",
    //   filter: false,
    //   width: 50,
    // } as unknown as ColDef<OrderExtended>,
    // {
    //   field: "save",
    //   headerName: "S",
    //   cellRenderer: Renderer.saveButton,
    //   editable: false,
    //   pinned: "left",
    //   filter: false,
    //   width: 50,
    // } as unknown as ColDef<OrderExtended>,
    // {
    //   field: "view",
    //   headerName: "V",
    //   cellRenderer: Renderer.createViewButton(),
    //   editable: false,
    //   pinned: "left",
    //   filter: false,
    //   width: 50,
    // } as unknown as ColDef<OrderExtended>,
    {
      headerName: "Date",
      field: "created_at",
      filter: "agDateColumnFilter",
      cellEditor: "agDateCellEditor",
      valueGetter: (params) => {
        const value = params.data?.created_at;
        return value ? new Date(value) : null;
      },
      valueFormatter: (params) => {
        const value = params.value;
        if (!value) return "";
        const date = new Date(value);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
      },

      width: 120,
    },
    { headerName: "Customer", field: "customers.name" },
    {
      headerName: "Identity",
      field: "customer_id",
      width: 120,
    },
    { field: "address" },
    {
      headerName: "Payment",
      field: "payment_types.name",
      width: 120,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["გადარიცხვა", "ხელზე"],
      },
    },
    { field: "items" },
    {
      headerName: "Total",
      field: "price",
      width: 100,
      valueGetter: (params) => {
        const value = params.data?.price;
        if (typeof value !== "number") {
          throw new Error("price value is not number");
        }
        return value ? value / 100 : null;
      },
      valueFormatter: (params) => {
        return params.value != null ? params.value.toFixed(2) : "";
      },
      cellClass: "ag-right-aligned-cell",
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Provider",
      field: "providers.name",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["405049923 LTD KILL (VAT)", "405140217 LTD KILLER"],
      },
    },
    { headerName: "Seller", field: "employees.display_name" },
    // { field: "phone", width: 100 },
    // { field: "email" },
    // {
    //   field: "delivery_date",
    // },
    // { field: "technician", editable: false },
    // { field: "document", cellRenderer: Renderer.documentLinkRenderer },
    // { field: "order_id", editable: false },
    // { field: "plan_time", editable: false },
    // { field: "approve", editable: false },
  ];
};
