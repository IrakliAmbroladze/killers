"use client";
import { useRef, useMemo } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import * as constants from "../constants";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";
import { OrderExtended } from "@/types/Order";
import { DateRange } from "./DateRange";
import { handleDeleteRows, handleCopyRows } from "@/utils";
import BulkActionButton from "./BulkActionButton";

ModuleRegistry.registerModules([AllCommunityModule]);

const OrderTable = ({ orders }: { orders: OrderExtended[] }) => {
  const gridRef = useRef<AgGridReact<OrderExtended> | null>(null);

  const columnDefs = useMemo(() => constants.getColumnDefs(gridRef), [gridRef]);

  return (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex justify-around">
        <BulkActionButton
          gridRef={gridRef}
          updateFunction={handleCopyRows}
          text={"copy"}
        />
        <Link
          href={`./${constants.pageName}/new-order`}
          className="hover:underline border rounded-lg px-2.5 py-1.5"
        >
          create-invoice
        </Link>
        <Link
          href={`./${constants.pageName}/new-customer`}
          className="hover:underline border rounded-lg px-2.5 py-1.5"
        >
          create-customer
        </Link>
        <BulkActionButton
          gridRef={gridRef}
          updateFunction={handleDeleteRows}
          text={"delete"}
        />
      </div>
      <DateRange />
      <ErrorBoundary fallback={<div>Failed to load table</div>}>
        <AgGridReact
          ref={gridRef}
          theme={constants.myTheme}
          rowSelection={constants.rowSelection}
          rowData={orders}
          columnDefs={columnDefs}
          pagination={constants.paginationConfig.pagination}
          paginationPageSize={constants.paginationConfig.Size}
          paginationPageSizeSelector={constants.paginationConfig.Selector}
          defaultColDef={constants.defaultColumnDefs}
          enableCellTextSelection={true}
          getRowId={(params) => params.data.id}
        />
      </ErrorBoundary>
    </div>
  );
};

export default OrderTable;
