import { useOrders } from "@/hooks/useOrders";
import { Sheets_Invoice } from "@/types/invoices";
import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

const CopyRows = ({
  gridRef,
}: {
  gridRef: RefObject<AgGridReact<Sheets_Invoice> | null>;
}) => {
  const { addOrder } = useOrders();

  return (
    <button
      className="copy-button hover:underline cursor-pointer "
      onClick={() => {
        const api = gridRef.current?.api;
        if (!api) return;
        const selectedRows = api.getSelectedRows();
        const userInputDate = window.prompt(
          "შეიყვანე შეკვეთის მიღების თარიღი (მაგ: 202505):",
          ""
        );
        if (!userInputDate) return;

        if (selectedRows && selectedRows.length > 0) {
          const newRows = selectedRows.map((row) => {
            const original = row;
            const newRow = {
              ...original,
              order_id: crypto.randomUUID(),
              delivery_date: "",
              technician: "",
              document: "",
              plan_time: "",
              approve: "",
              date: userInputDate,
              customer: original.customer ?? "",
              identity: original.identity ?? "",
              address: original.address ?? "",
              payment: original.payment ?? "",
              items: original.items ?? "",
              total: original.total ?? "",
              provider: original.provider ?? "",
              seller: original.seller ?? "",
              phone: original.phone ?? "",
              email: original.email ?? "",
            };
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
            return newRow;
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
        } else {
          alert("მონიშნე დასაკოპირებელი მინიმუმ ერთი შეკვეთა.");
        }
      }}
    >
      Copy Selected Row(s)
    </button>
  );
};

export default CopyRows;
