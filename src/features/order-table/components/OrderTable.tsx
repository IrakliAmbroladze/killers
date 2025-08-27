"use client";
import { useRef, useMemo, useCallback, Suspense } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import * as constants from "../constants";
import Link from "next/link";
import { OrderExtended } from "@/types";
import DateRange from "./DateRange";
import BulkActionButton from "./BulkActionButton";
import DownloadCSV from "./DownloadCSV";
import PromiseComponent from "./PromiseComponent";

ModuleRegistry.registerModules([AllCommunityModule]);

const OrderTable = ({
  ordersPromise,
}: {
  ordersPromise: Promise<{
    orders: OrderExtended[];
    totalCount: number;
  }>;
}) => {
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
      <Suspense fallback={<div>loading data ...</div>}>
        <PromiseComponent
          ordersPromise={ordersPromise}
          columnDefs={columnDefs}
          gridRef={gridRef}
        />
      </Suspense>
    </div>
  );
};

export default OrderTable;
