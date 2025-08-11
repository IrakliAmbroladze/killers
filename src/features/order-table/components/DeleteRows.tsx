import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";
import { OrderExtended } from "@/types";
import { deleteOrders } from "@/lib";

type DeleteRowsProps = {
  gridRef: RefObject<AgGridReact<OrderExtended> | null>;
};

const DeleteRows = ({ gridRef }: DeleteRowsProps) => {
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

        const order_ids = selectedRows.map((row) => row.id);

        try {
          const response = await deleteOrders(order_ids);
          console.log(response.message);

          api.applyTransaction({ remove: selectedRows });
        } catch (e) {
          console.error("Bulk delete failed:", e);
          alert("წაშლისას მოხდა შეცდომა.");
        }
      }}
    >
      Delete Selected Row(s)
    </button>
  );
};

export default DeleteRows;
