//handleCopyRows.ts

import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";
import { OrderExtended } from "@/types/Order";
import { normalizeAgGridRowForCopy } from "../../features/order-table/utils/normalizeAgGridRowForCopy";
import { addOrders } from "@/lib";
import { alertsForSelectedRows } from "@/utils";

export const handleCopyRows = async (
  gridRef: RefObject<AgGridReact<OrderExtended> | null>
) => {
  const api = gridRef.current?.api;
  if (!api) {
    console.warn("no AgGrid api");
    return;
  }
  const selectedRows = api.getSelectedRows();
  const input = alertsForSelectedRows(selectedRows);
  if (selectedRows.length > 1 && !input) return;

  api.setGridOption("loading", true);
  try {
    const newOrders = selectedRows.map((row) =>
      normalizeAgGridRowForCopy(row, input)
    );

    const response = await addOrders(newOrders);
    if (response.status == "OK") {
      api.deselectAll();
      api.paginationGoToPage(0);
      alert(response.message);
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error inserting orders", error);
    alert("❌ დაფიქსირდა შეცდომა შეკვეთის კოპირებისას.");
  } finally {
    api.setGridOption("loading", false);
  }
};
