import { useOrders } from "@/hooks/useOrders";
import { Sheets_Invoice } from "@/types/invoices";
import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";
import { buildCopiedRow } from "./buildCopiedRow ";

export const handleCopyRows = async (
  gridRef: RefObject<AgGridReact<Sheets_Invoice> | null>,
  addOrder: ReturnType<typeof useOrders>["addOrder"]
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
    ""
  );
  if (!userInputDate) {
    alert("შეკვეთის აღების თარიღი არ მიგითითებია");
    return;
  }

  const newRows = selectedRows.map((row) => buildCopiedRow(row, userInputDate));

  newRows.forEach((row) => {
    addOrder(row);
    try {
      fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...row, status: "add" }),
      });
    } catch (error) {
      console.error(error);
    }
  });

  api.applyTransaction({
    add: newRows,
    addIndex: 0,
  });

  api.paginationGoToPage(0);

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
