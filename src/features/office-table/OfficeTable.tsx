"use client";
import { useEffect, useRef } from "react";

import React, { useMemo, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import type {
  ICellRendererParams,
  RowSelectionOptions,
  ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useOrders } from "@/hooks/useOrders";
import { Sheets_Invoice } from "@/types/invoices";
import { useOrderModal } from "@/hooks/useOrderModal";
import { updateOrderInDB } from "@/utils/updateOrderInDB";
import { FiCopy } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";

ModuleRegistry.registerModules([AllCommunityModule]);

const OfficeTable = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const { orders } = useOrders();
  const [rowData, setRowData] = useState<Sheets_Invoice[]>(orders);

  useEffect(() => {
    setRowData(orders);
  }, [orders]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      filterParams: { buttons: ["clear"] },
      floatingFilter: true,
      editable: true,
    };
  }, []);

  const gridRef = useRef<AgGridReact<Sheets_Invoice>>(null);

  const rowSelection: RowSelectionOptions<Sheets_Invoice> = useMemo(() => {
    return {
      mode: "multiRow",
      selectAll: "filtered",
      enableClickSelection: true,
    };
  }, []);

  const { openOrder } = useOrderModal();
  const { addOrder, deleteOrder } = useOrders();

  const handleView = (orderId: string) => {
    openOrder(orderId);
  };

  const viewButton = (props: ICellRendererParams<Sheets_Invoice>) => {
    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          if (props.data?.order_id) handleView(props.data.order_id);
        }}
      >
        <RxEyeOpen />
      </button>
    );
  };
  const copyButton = (props: ICellRendererParams<Sheets_Invoice>) => {
    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          if (props.data) {
            const original = props.data;

            const userInputDate = window.prompt(
              "შეიყვანე შეკვეთის მიღების თარიღი (მაგ: 202505):",
              original.date ?? ""
            );
            if (!userInputDate) return;
            const newRow: Sheets_Invoice = {
              ...original,
              order_id: crypto.randomUUID(),
              delivery_date: "",
              technician: "",
              document: "",
              plan_time: "",
              approve: "",
              date: userInputDate,
              customer: original.customer ?? "",
              identity: original.identity ?? "",
              address: original.address ?? "",
              payment: original.payment ?? "",
              items: original.items ?? "",
              total: original.total ?? "",
              provider: original.provider ?? "",
              seller: original.seller ?? "",
              phone: original.phone ?? "",
              email: original.email ?? "",
            };
            setRowData((prev) => [newRow, ...prev]);
            addOrder(newRow);

            try {
              fetch("/api/proxy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...newRow, status: "add" }),
              });
            } catch (error) {
              console.error(error);
            }
          }
        }}
      >
        <FiCopy />
      </button>
    );
  };
  const saveButton = (props: ICellRendererParams<Sheets_Invoice>) => {
    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          if (props.data?.order_id) updateOrderInDB(props.data);
        }}
      >
        <FaRegSave />
      </button>
    );
  };
  const deleteButton = (props: ICellRendererParams<Sheets_Invoice>) => {
    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          const confirmDelete = window.confirm(
            `წაიშალოს შემდეგი მონაცემები? \n 
          Identity: ${props.data?.identity} \n 
          Customer: ${props.data?.customer} \n 
          `
          );
          if (confirmDelete && props.data) {
            gridRef.current?.api.applyTransaction({ remove: [props.data] });
            deleteOrder(props.data);
            try {
              fetch("/api/proxy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  order_id: props.data.order_id,
                  status: "delete",
                }),
              });
            } catch (error) {
              console.error(error);
            }
          }
        }}
      >
        🗑️
      </button>
    );
  };

  // Column Definitions: Defines the columns to be displayed.
  const columnDefs: ColDef<Sheets_Invoice>[] = [
    {
      field: "delete",
      headerName: "D",
      cellRenderer: deleteButton,
      editable: false,
      pinned: "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<Sheets_Invoice>,
    {
      field: "copy",
      headerName: "C",
      cellRenderer: copyButton,
      editable: false,
      pinned: "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<Sheets_Invoice>,
    {
      field: "save",
      headerName: "S",
      cellRenderer: saveButton,
      editable: false,
      pinned: "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<Sheets_Invoice>,
    {
      field: "view",
      headerName: "V",
      cellRenderer: viewButton,
      editable: false,
      pinned: "left",
      filter: false,
      width: 50,
    } as unknown as ColDef<Sheets_Invoice>,
    {
      field: "date",

      width: 120,
    },
    { field: "customer" },
    {
      field: "identity",
      width: 120,
    },
    { field: "address" },
    {
      field: "payment",
      width: 120,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["გადარიცხვა", "ხელზე"],
      },
    },
    { field: "items" },
    { field: "total", width: 100 },
    {
      field: "provider",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["405049923 LTD KILL (VAT)", "405140217 LTD KILLER"],
      },
    },
    { field: "seller" },
    { field: "phone", width: 100 },
    { field: "email" },
    {
      field: "delivery_date",
    },
    { field: "technician", editable: false },
    { field: "document" },
    { field: "order_id", editable: false },
    { field: "plan_time", editable: false },
    { field: "approve", editable: false },
  ];
  const myTheme = themeQuartz
    .withParams(
      {
        backgroundColor: "#FFE8E0",
        foregroundColor: "#361008CC",
        browserColorScheme: "light",
      },
      "light"
    )
    .withParams(
      {
        backgroundColor: "#201008",
        foregroundColor: "#FFFFFFCC",
        browserColorScheme: "dark",
      },
      "dark"
    );

  const pagination = true;
  const paginationPageSize = 20;
  const paginationPageSizeSelector = [5, 10, 20, 50, 100, 500];
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return loading ? (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div>
        იშლება... {count} / {total}
      </div>
    </div>
  ) : (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex gap-10 ">
        <button
          className="copy-button hover:underline cursor-pointer "
          onClick={() => {
            const selectedRows = gridRef.current?.api.getSelectedRows();
            const userInputDate = window.prompt(
              "შეიყვანე შეკვეთის მიღების თარიღი (მაგ: 202505):",
              ""
            );
            if (!userInputDate) return;

            if (selectedRows && selectedRows.length > 0) {
              const newRows = selectedRows.map((row) => {
                const original = row;
                const newRow: Sheets_Invoice = {
                  ...original,
                  order_id: crypto.randomUUID(),
                  delivery_date: "",
                  technician: "",
                  document: "",
                  plan_time: "",
                  approve: "",
                  date: userInputDate,
                  customer: original.customer ?? "",
                  identity: original.identity ?? "",
                  address: original.address ?? "",
                  payment: original.payment ?? "",
                  items: original.items ?? "",
                  total: original.total ?? "",
                  provider: original.provider ?? "",
                  seller: original.seller ?? "",
                  phone: original.phone ?? "",
                  email: original.email ?? "",
                };
                addOrder(newRow);

                try {
                  fetch("/api/proxy", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...newRow, status: "add" }),
                  });
                } catch (error) {
                  console.error(error);
                }
                return newRow;
              });

              gridRef.current?.api.applyTransaction({
                add: newRows,
                addIndex: 0,
              });
            } else {
              alert("მონიშნე დასაკოპირებელი მინიმუმ ერთი შეკვეთა.");
            }
          }}
        >
          Copy Selected Row(s)
        </button>
        <button
          className="delete-button hover:underline cursor-pointer "
          onClick={async () => {
            const selectedRows = gridRef.current?.api.getSelectedRows();

            if (selectedRows && selectedRows.length > 20) {
              alert("ოცზე მეტი მონაცემის წაშლაზე შეზღუდვაა");
            } else if (selectedRows && selectedRows.length > 0) {
              const confirmDelete = window.confirm(
                `ნამდვილად გსურს წაშლა? \nწასაშლელი მონაცემების რაოდენობაა: ${selectedRows.length}`
              );

              if (confirmDelete) {
                const rowsToDelete = [...selectedRows];
                setTotal(rowsToDelete.length);
                setLoading(true);
                for (const row of rowsToDelete) {
                  setCount((prev) => prev + 1);
                  try {
                    await fetch("/api/proxy", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        order_id: row.order_id,
                        status: "delete",
                      }),
                    });

                    await delay(50);
                  } catch (e) {
                    console.error("Failed to delete:", row.order_id);
                    console.error("Failed to delete:", e);
                  }
                }
                setCount(0);
                gridRef.current?.api.applyTransaction({ remove: rowsToDelete });
                rowsToDelete.forEach(deleteOrder);
                setLoading(false);
              }
            } else {
              alert("მონიშნე წასაშლელი მინიმუმ ერთი შეკვეთა.");
            }
          }}
        >
          Delete Selected Row(s)
        </button>
      </div>
      <AgGridReact
        ref={gridRef}
        theme={myTheme}
        rowSelection={rowSelection}
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        defaultColDef={defaultColDef}
        enableCellTextSelection={true}
      />
    </div>
  );
};

export default OfficeTable;
