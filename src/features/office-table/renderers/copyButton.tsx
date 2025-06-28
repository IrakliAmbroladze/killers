import type { ICellRendererParams } from "ag-grid-community";
import type { Sheets_Invoice } from "@/types/invoices";
import { FiCopy } from "react-icons/fi";
import { useOrders } from "@/hooks/useOrders";
import { Dispatch, SetStateAction } from "react";

export const createCopyButton = (
  setRowData: Dispatch<SetStateAction<Sheets_Invoice[]>>
) => {
  return function CopyButton(props: ICellRendererParams<Sheets_Invoice>) {
    const { addOrder } = useOrders();

    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          if (props.data) {
            const original = props.data;

            const userInputDate = window.prompt(
              "შეიყვანე შეკვეთის მიღების თარიღი (მაგ: 202505):",
              original.date ?? ""
            );
            if (!userInputDate) return;
            const newRow: Sheets_Invoice = {
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
            setRowData((prev) => [newRow, ...prev]);
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
          }
        }}
      >
        <FiCopy />
      </button>
    );
  };
};
