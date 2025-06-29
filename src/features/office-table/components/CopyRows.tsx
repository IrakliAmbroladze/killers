import { useOrders } from "@/hooks/useOrders";
import { Sheets_Invoice } from "@/types/invoices";
import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";
import { handleCopyRows } from "../utils";

const CopyRows = ({
  gridRef,
}: {
  gridRef: RefObject<AgGridReact<Sheets_Invoice> | null>;
}) => {
  const { addOrder } = useOrders();

  return (
    <button
      className="copy-button hover:underline cursor-pointer "
      onClick={() => handleCopyRows(addOrder, gridRef)}
    >
      Copy Selected Row(s)
    </button>
  );
};

export default CopyRows;
