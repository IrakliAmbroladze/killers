"use client";
import { useRef, useMemo } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// import { useOrders } from "@/hooks/useOrders";
// import type { Sheets_Invoice } from "@/types/invoices";
import * as constants from "../constants";
// import DeleteRows from "./DeleteRows";
// import DeleteInProcess from "./DeleteInProcess";
// import CopyRows from "./CopyRows";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";
import { OrderExtended } from "@/types/Order";
import { DateRange } from "./DateRange";

ModuleRegistry.registerModules([AllCommunityModule]);

const OrderTable = ({ orders }: { orders: OrderExtended[] }) => {
  // const [loading, setLoading] = useState(false);
  // const [total, setTotal] = useState(0);
  // const { orders } = useOrders();

  const gridRef = useRef<AgGridReact<OrderExtended> | null>(null);

  const columnDefs = useMemo(() => constants.getColumnDefs(gridRef), [gridRef]);

  // return loading ? (
  //   <DeleteInProcess total={total} />
  // ) : (
  return (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex justify-around">
        {/* <CopyRows gridRef={gridRef} /> */}
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
        {/* <DeleteRows
          // gridRef={gridRef}
          setLoading={setLoading}
          setTotal={setTotal}
        /> */}
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
