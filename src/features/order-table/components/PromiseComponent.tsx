import { OrderExtended } from "@/types";
import React, { use } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as constants from "../constants";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColGroupDef } from "ag-grid-community";

const PromiseComponent = ({
  ordersPromise,
  columnDefs,
  gridRef,
}: {
  ordersPromise: Promise<{
    orders: OrderExtended[];
    totalCount: number;
  }>;
  columnDefs:
    | (ColDef<OrderExtended> | ColGroupDef<OrderExtended>)[]
    | null
    | undefined;
  gridRef: React.Ref<AgGridReact<OrderExtended>> | undefined;
}) => {
  const { orders } = use(ordersPromise);

  return (
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
  );
};

export default PromiseComponent;
