//handleCopyRows.ts

import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";
import { OrderExtended } from "@/types/Order";
import { normalizeAgGridRowForCopy } from "./normalizeAgGridRowForCopy";
import { insertOrder } from "@/lib";

const alertsForSelectedRows = (selectedRows: OrderExtended[]) => {
  console.log("typeof selected rows: ", typeof selectedRows);
  console.log("selected rows: ", selectedRows);
  if (selectedRows.length === 0) {
    alert("მონიშნე დასაკოპირებელი მინიმუმ ერთი შეკვეთა.");
    return;
  }
  if (selectedRows.length !== 1) {
    const userInputDate = window.prompt(
      "შეიყვანე შეკვეთის მიღების თარიღი (მაგ: 202505):",
      selectedRows[0].created_at ?? ""
    );
    if (!userInputDate) {
      alert("შეკვეთის აღების თარიღი არ მიგითითებია");
      return;
    }
  }
};
export const handleCopyRows = async (
  gridRef: RefObject<AgGridReact<OrderExtended> | null>
) => {
  const api = gridRef.current?.api;
  if (!api) {
    console.warn("no AgGrid api");
    return;
  }
  const selectedRows = api.getSelectedRows();
  alertsForSelectedRows(selectedRows);

  api.setGridOption("loading", true);
  const newOrders = selectedRows.map((row) => normalizeAgGridRowForCopy(row));
  // const currentRow = selectedRows[0];
  // console.log("currentRow is: ", currentRow);

  // const newOrder = normalizeAgGridRowForCopy(currentRow);

  const insertedOrdersObj = await insertOrder(newOrders);
  const insertedOrders: OrderExtended[] =
    insertedOrdersObj != undefined ? insertedOrdersObj.data : [];
  api.applyTransaction({
    add: insertedOrders,
    addIndex: 0,
  });
  api.paginationGoToPage(0);
  setTimeout(() => {
    api.deselectAll();
    insertedOrders.forEach((newRow) => {
      const node = api.getRowNode(newRow.id);
      if (node) {
        node.setSelected(true);
        api.ensureNodeVisible(node, "top");
      }
    });
  }, 50);
  api.setGridOption("loading", false);
};
