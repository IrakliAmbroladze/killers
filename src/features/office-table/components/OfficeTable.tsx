"use client";
import { useEffect, useRef, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useOrders } from "@/hooks/useOrders";
import type { Sheets_Invoice } from "@/types/invoices";
import * as constants from "../constants";
import DeleteRows from "./DeleteRows";
import DeleteInProcess from "./DeleteInProcess";
import CopyRows from "./CopyRows";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";

ModuleRegistry.registerModules([AllCommunityModule]);

const OfficeTable = () => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [rowData, setRowData] = useState<Sheets_Invoice[]>([]);
  const { orders } = useOrders();

  useEffect(() => {
    setRowData(orders);
  }, [orders]);

  const gridRef = useRef<AgGridReact<Sheets_Invoice> | null>(null);

  const columnDefs = useMemo(() => constants.getColumnDefs(gridRef), [gridRef]);

  return loading ? (
    <DeleteInProcess total={total} />
  ) : (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex justify-around">
        <CopyRows gridRef={gridRef} />
        <Link
          href="./office/create-invoice"
          className="hover:underline border rounded-lg px-2.5 py-1.5"
        >
          create-invoice
        </Link>
        <DeleteRows
          gridRef={gridRef}
          setLoading={setLoading}
          setTotal={setTotal}
        />
      </div>
      <ErrorBoundary fallback={<div>Failed to load table</div>}>
        <AgGridReact
          ref={gridRef}
          theme={constants.myTheme}
          rowSelection={constants.rowSelection}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={constants.paginationConfig.pagination}
          paginationPageSize={constants.paginationConfig.Size}
          paginationPageSizeSelector={constants.paginationConfig.Selector}
          defaultColDef={constants.defaultColumnDefs}
          enableCellTextSelection={true}
          getRowId={(params) => params.data.order_id}
        />
      </ErrorBoundary>
    </div>
  );
};

export default OfficeTable;
