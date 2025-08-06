//handleCopyRows.ts

import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";
import { OrderExtended } from "@/types/Order";
import { normalizeAgGridRowForCopy } from "./normalizeAgGridRowForCopy";
import { insertOrder } from "@/lib";
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
  if (!alertsForSelectedRows(selectedRows)) return;

  api.setGridOption("loading", true);
  try {
    const newOrders = selectedRows.map((row) => normalizeAgGridRowForCopy(row));

    const insertedOrdersObj = await insertOrder(newOrders);
    const insertedOrders: OrderExtended[] =
      insertedOrdersObj != undefined ? insertedOrdersObj.data : [];
    api.applyTransaction({
      add: insertedOrders,
      addIndex: 0,
    });
    api.paginationGoToPage(0);
    api.deselectAll();
    insertedOrders.forEach((newRow) => {
      const node = api.getRowNode(newRow.id);
      if (node) {
        node.setSelected(true);
        api.ensureNodeVisible(node, "top");
      }
    });
  } catch (error) {
    console.error("Error inserting orders", error);
    alert("დაფიქსირდა შეცდომა შეკვეთის კოპირებისას.");
  } finally {
    api.setGridOption("loading", false);
  }
};
