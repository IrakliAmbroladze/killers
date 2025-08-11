import { OrderExtended } from "@/types";
import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

const BulkActionButton = ({
  gridRef,
  updateFunction,
  text,
}: {
  gridRef: RefObject<AgGridReact<OrderExtended> | null>;
  updateFunction: (value: RefObject<AgGridReact<OrderExtended> | null>) => void;
  text: string;
}) => {
  return (
    <button
      className="hover:underline cursor-pointer "
      onClick={() => updateFunction(gridRef)}
    >
      {text}
    </button>
  );
};

export default BulkActionButton;
