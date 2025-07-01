//handleCopyRows.ts

import { useOrders } from "@/hooks/useOrders";
import { buildCopiedRow } from "./buildCopiedRow ";
import { Sheets_Invoice } from "@/types/invoices";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";

export const handleCopyRows = async (
  addOrder: ReturnType<typeof useOrders>["addOrder"],
  gridRef: RefObject<AgGridReact<Sheets_Invoice> | null>
) => {
  const api = gridRef.current?.api;
  if (!api) return;
  const selectedRows = api.getSelectedRows();
  if (selectedRows.length === 0) {
    alert("მონიშნე დასაკოპირებელი მინიმუმ ერთი შეკვეთა.");
    return;
  }
  const userInputDate = window.prompt(
    "შეიყვანე შეკვეთის მიღების თარიღი (მაგ: 202505):",
    selectedRows[0].date ?? ""
  );
  if (!userInputDate) {
    alert("შეკვეთის აღების თარიღი არ მიგითითებია");
    return;
  }

  const newRows = selectedRows.map((row) => buildCopiedRow(row, userInputDate));
  newRows.forEach((row) => addOrder(row));

  api.applyTransaction({
    add: newRows,
    addIndex: 0,
  });

  api.paginationGoToPage(0);

  try {
    // Bulk fetch request
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "bulkAdd",
        rows: newRows,
      }),
    });

    const result = await response.json();
    if (result.error) throw new Error(result.error);
  } catch (error) {
    console.error("Bulk add error:", error);
    alert("შეცდომა მოხდა დაკოპირებისას.");
  }

  setTimeout(() => {
    api.deselectAll();
    newRows.forEach((newRow) => {
      const node = api.getRowNode(newRow.order_id);
      if (node) {
        node.setSelected(true);
        api.ensureNodeVisible(node, "top");
      }
    });
  }, 50);
};
