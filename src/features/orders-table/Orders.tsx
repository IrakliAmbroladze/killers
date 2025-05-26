"use client";

import { Sheets_Invoice } from "@/types/invoices";
import React, { ChangeEvent, useEffect, useState } from "react";
import EditModal from "@/components/EditModal";
import Search from "@/components/search";
import { useDebouncedCallback } from "use-debounce";
import { ErrorBoundary } from "react-error-boundary";
import ErrorModal from "@/components/error-modal";
import { useOrders } from "@/hooks/useOrders";
import ReturnOrders from "./ReturnOrders";
import { wholeListSearch } from "@/utils/orders-table/wholeListSearch";

const Orders = () => {
  const { orders } = useOrders();

  const [openModalIndex, setOpenModalIndex] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [status, setStatus] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedSearchTerm(value);
  }, 1000);

  useEffect(() => {
    const storedSearch = localStorage.getItem("search");
    if (storedSearch) {
      setSearchTerm(storedSearch);
      setDebouncedSearchTerm(storedSearch);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("search", searchTerm);
    debounced(searchTerm);
  }, [debounced, searchTerm]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchedInvoices = wholeListSearch(orders, debouncedSearchTerm);

  return (
    <div className="overflow-x-auto sm:p-4">
      <Search search={searchTerm} onSearch={handleSearch} />
      <ReturnOrders
        onSetStatus={setStatus}
        onSetTitle={setTitle}
        onOpenModal={setOpenModalIndex}
        modalIndex={openModalIndex}
        orders={searchedInvoices}
      />
      <ErrorBoundary fallback={<ErrorModal />}>
        {openModalIndex !== null && (
          <EditModal
            title={title}
            invoice={
              searchedInvoices.find(
                (invoice) => invoice.order_id === openModalIndex
              ) as Sheets_Invoice
            }
            setOpenModalIndex={setOpenModalIndex}
            index={openModalIndex}
            status={status}
          />
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Orders;
