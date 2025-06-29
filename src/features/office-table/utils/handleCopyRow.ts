import { useOrders } from "@/hooks/useOrders";
import { buildCopiedRow } from "./buildCopiedRow ";
import { Sheets_Invoice } from "@/types/invoices";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";

export const handleCopyRow = (
  original: Sheets_Invoice,
  addOrder: ReturnType<typeof useOrders>["addOrder"],
  gridRef: RefObject<AgGridReact<Sheets_Invoice> | null>
) => {
  const api = gridRef.current?.api;
  if (!api) return;
  const userInputDate = window.prompt(
    "შეიყვანე შეკვეთის მიღების თარიღი (მაგ: 202505):",
    original.date ?? ""
  );
  if (!userInputDate) return;
  const newRow = buildCopiedRow(original, userInputDate);
  addOrder(newRow);

  try {
    fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newRow, status: "add" }),
    });
  } catch (error) {
    console.error(error);
  }
  api.applyTransaction({
    add: [newRow],
    addIndex: 0,
  });

  api.paginationGoToPage(0);

  setTimeout(() => {
    api.deselectAll();
    const node = api.getRowNode(newRow.order_id);
    if (node) {
      node.setSelected(true);
      api.ensureNodeVisible(node, "top");
    }
  }, 50);
};
