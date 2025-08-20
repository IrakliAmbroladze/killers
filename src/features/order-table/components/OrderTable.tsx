"use client";
import { useRef, useMemo, useCallback } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import * as constants from "../constants";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";
import { OrderExtended } from "@/types";
import DateRange from "./DateRange";
import BulkActionButton from "./BulkActionButton";
import DownloadCSV from "./DownloadCSV";

ModuleRegistry.registerModules([AllCommunityModule]);

const OrderTable = ({ orders }: { orders: OrderExtended[] }) => {
  const gridRef = useRef<AgGridReact<OrderExtended> | null>(null);

  const columnDefs = useMemo(() => constants.getColumnDefs(gridRef), [gridRef]);
  const onBtnExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  return (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex justify-around mb-2">
        <DateRange />
        {["new-order", "new-customer"].map((n) => (
          <Link
            key={n}
            href={`./${constants.pageName}/${n}`}
            className="hover:underline border rounded-lg px-2.5 py-0.5"
          >
            {n}
          </Link>
        ))}
        <DownloadCSV onClick={onBtnExport}>Download CSV</DownloadCSV>
        {constants.bulkActionButtons.map((b) => (
          <BulkActionButton
            key={b.text}
            gridRef={gridRef}
            updateFunction={b.action}
            text={b.text}
          />
        ))}
      </div>
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
