"use client";
import { useEffect, useRef, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useOrders } from "@/hooks/useOrders";
import type { Sheets_Invoice } from "@/types/invoices";
import * as Constant from "../constants";
import DeleteRows from "./DeleteRows";
import DeleteInProcess from "./DeleteInProcess";
import CopyRows from "./CopyRows";

ModuleRegistry.registerModules([AllCommunityModule]);

const OfficeTable = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const { orders } = useOrders();
  const [rowData, setRowData] = useState<Sheets_Invoice[]>([]);

  useEffect(() => {
    setRowData(orders);
  }, [orders]);

  const gridRef = useRef<AgGridReact<Sheets_Invoice> | null>(null);

  const columnDefs = useMemo(
    () => Constant.getColumnDefs(gridRef, setRowData),
    [gridRef, setRowData]
  );

  return loading ? (
    <DeleteInProcess count={count} total={total} />
  ) : (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex gap-10 ">
        <CopyRows gridRef={gridRef} />
        <DeleteRows
          gridRef={gridRef}
          setLoading={setLoading}
          setTotal={setTotal}
          setCount={setCount}
        />
      </div>
      <AgGridReact
        ref={gridRef}
        theme={Constant.myTheme}
        rowSelection={Constant.rowSelection}
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={Constant.paginationConfig.pagination}
        paginationPageSize={Constant.paginationConfig.Size}
        paginationPageSizeSelector={Constant.paginationConfig.Selector}
        defaultColDef={Constant.defaultColumnDefs}
        enableCellTextSelection={true}
        getRowId={(params) => params.data.order_id}
      />
    </div>
  );
};

export default OfficeTable;
