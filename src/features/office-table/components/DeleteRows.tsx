import { useOrders } from "@/hooks/useOrders";
import { AgGridReact } from "ag-grid-react";
import { Dispatch, RefObject, SetStateAction } from "react";
import { Sheets_Invoice } from "@/types/invoices";

type DeleteRowsProps = {
  gridRef: RefObject<AgGridReact<Sheets_Invoice> | null>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTotal: Dispatch<SetStateAction<number>>;
  setCount: Dispatch<SetStateAction<number>>;
};

const DeleteRows = ({
  gridRef,
  setLoading,
  setTotal,
  setCount,
}: DeleteRowsProps) => {
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const { deleteOrder } = useOrders();

  return (
    <button
      className="delete-button hover:underline cursor-pointer "
      onClick={async () => {
        const api = gridRef.current?.api;
        if (!api) return;
        const selectedRows = api.getSelectedRows();

        if (selectedRows && selectedRows.length > 20) {
          alert("ოცზე მეტი მონაცემის წაშლაზე შეზღუდვაა");
        } else if (selectedRows && selectedRows.length > 0) {
          const confirmDelete = window.confirm(
            `ნამდვილად გსურს წაშლა? \nწასაშლელი მონაცემების რაოდენობაა: ${selectedRows.length}`
          );

          if (confirmDelete) {
            const rowsToDelete = [...selectedRows];
            setTotal(rowsToDelete.length);
            setLoading(true);
            for (const row of rowsToDelete) {
              setCount((prev) => prev + 1);
              try {
                await fetch("/api/proxy", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    order_id: row.order_id,
                    status: "delete",
                  }),
                });

                await delay(50);
              } catch (e) {
                console.error("Failed to delete:", row.order_id);
                console.error("Failed to delete:", e);
              }
            }
            setCount(0);
            api.applyTransaction({ remove: rowsToDelete });
            rowsToDelete.forEach(deleteOrder);
            setLoading(false);
          }
        } else {
          alert("მონიშნე წასაშლელი მინიმუმ ერთი შეკვეთა.");
        }
      }}
    >
      Delete Selected Row(s)
    </button>
  );
};

export default DeleteRows;
