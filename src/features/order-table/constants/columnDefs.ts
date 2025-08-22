//screen size

import type { ColDef } from "ag-grid-community";
import * as Renderer from "../renderers";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";
import { OrderExtended } from "@/types/Order";
import { formatAgGridDate } from "../utils";
import { dateOnlyComparator } from "../utils/customDateComparator";
import { validDecimalNumberRegex } from "@/constants/regex";
// import * as Utils from "@/utils";

export const getColumnDefs = (
  gridRef: RefObject<AgGridReact<OrderExtended> | null>
): ColDef<OrderExtended>[] => {
  return [
    {
      field: "delete",
      headerName: "D",
      cellRenderer: Renderer.createDeleteButton(gridRef),
      editable: false,
      pinned: "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<OrderExtended>,
    {
      field: "copy",
      headerName: "C",
      cellRenderer: Renderer.createCopyButton(gridRef),
      editable: false,
      pinned: "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<OrderExtended>,
    {
      field: "save",
      headerName: "S",
      cellRenderer: Renderer.SaveButton,
      editable: false,
      pinned: "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<OrderExtended>,
    {
      field: "view",
      headerName: "V",
      cellRenderer: Renderer.createViewButton(),
      editable: false,
      pinned: "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<OrderExtended>,
    {
      headerName: "Date",
      field: "created_at",
      filter: "agDateColumnFilter",
      cellEditor: "agDateCellEditor",
      valueGetter: (params) => {
        const value = params.data?.created_at;
        return value ? new Date(value) : null;
      },
      valueSetter: (params) => {
        if (params.newValue) {
          const date = new Date(params.newValue);
          const formattedDate = date.toLocaleDateString("en-CA");
          params.data.created_at = formattedDate;
          return true;
        }
        return false;
      },
      filterParams: {
        comparator: dateOnlyComparator,
      },
      valueFormatter: formatAgGridDate,
      width: 120,
    },

    { headerName: "Customer", field: "customers.name", editable: false },
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
      editable: true,
      valueFormatter: (params) => {
        return params.value != null ? Number(params.value).toFixed(2) : "";
      },
      valueParser: (params) => {
        const input = params.newValue?.toString().trim();

        if (!validDecimalNumberRegex.test(input)) {
          alert("⚠️ ჩაწერე მხოლოდ რიცხვი. ათწილადისთვის გამოიყენე წერტილი (.)");
          return params.oldValue;
        }
        return Number(input);
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
    { headerName: "Seller", field: "employees.display_name", width: 100 },
    { field: "phone", width: 100 },
    { field: "email", width: 100 },
    {
      field: "delivery_date",
      filter: "agDateColumnFilter",
      cellEditor: "agDateCellEditor",
      valueGetter: (params) => {
        const value = params.data?.delivery_date;
        return value ? new Date(value) : null;
      },
      valueSetter: (params) => {
        if (params.newValue) {
          const date = new Date(params.newValue);
          const formattedDate = date.toLocaleDateString("en-CA");
          params.data.delivery_date = formattedDate;
          return true;
        }
        return false;
      },
      filterParams: {
        comparator: dateOnlyComparator,
      },
      valueFormatter: formatAgGridDate,
      width: 120,
    },
    { field: "technician", editable: false },
    { field: "document", cellRenderer: Renderer.documentLinkRenderer },
    { headerName: "Order_id", field: "id", editable: false },
    { field: "plan_time", editable: false },
    { field: "approve", editable: false },
  ];
};
