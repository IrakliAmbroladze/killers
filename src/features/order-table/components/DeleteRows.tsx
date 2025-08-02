import { useOrders } from "@/hooks/useOrders";
import { AgGridReact } from "ag-grid-react";
import { Dispatch, RefObject, SetStateAction } from "react";
import { Sheets_Invoice } from "@/types/invoices";

type DeleteRowsProps = {
  gridRef: RefObject<AgGridReact<Sheets_Invoice> | null>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTotal: Dispatch<SetStateAction<number>>;
};

const DeleteRows = ({ gridRef, setLoading, setTotal }: DeleteRowsProps) => {
  const { deleteOrder } = useOrders();

  return (
    <button
      className="delete-button hover:underline cursor-pointer "
      onClick={async () => {
        const api = gridRef.current?.api;
        if (!api) return;
        const selectedRows = api.getSelectedRows();

        if (selectedRows.length === 0) {
          alert("მონიშნე წასაშლელი მინიმუმ ერთი შეკვეთა.");
          return;
        }

        if (selectedRows.length > 200) {
          alert("ორასზე მეტი მონაცემის წაშლაზე შეზღუდვაა");
          return;
        }

        const confirmDelete = window.confirm(
          `ნამდვილად გსურს წაშლა? \nწასაშლელი მონაცემების რაოდენობაა: ${selectedRows.length}`
        );
        if (!confirmDelete) return;

        setLoading(true);
        setTotal(selectedRows.length);

        const order_ids = selectedRows.map((row) => row.order_id);

        try {
          const response = await fetch("/api/proxy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: "bulkDelete",
              order_ids,
            }),
          });

          const result = await response.json();
          if (result.error) throw new Error(result.error);

          api.applyTransaction({ remove: selectedRows });
          selectedRows.forEach(deleteOrder);
        } catch (e) {
          console.error("Bulk delete failed:", e);
          alert("წაშლისას მოხდა შეცდომა.");
        } finally {
          setLoading(false);
        }
      }}
    >
      Delete Selected Row(s)
    </button>
  );
};

export default DeleteRows;
