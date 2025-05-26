"use client";

import { Sheets_Invoice } from "@/types/invoices";
import React, { ChangeEvent, useEffect, useState } from "react";
import EditModal from "@/components/EditModal";
import Search from "@/components/search";
import { useDebouncedCallback } from "use-debounce";
import fetchOrders from "@/utils/server/fetch-orders";
import { ErrorBoundary } from "react-error-boundary";
import ErrorModal from "@/components/error-modal";
import { useOrders } from "@/hooks/useOrders";
import ReturnOrders from "./ReturnOrders";
import Loading from "@/components/ui/Loading";

const Orders = () => {
  const { orders } = useOrders();
  const [invoices, setInvoices] = useState<Sheets_Invoice[]>([]);

  const start = 0;
  const [loading, setLoading] = useState(false);
  const [openModalIndex, setOpenModalIndex] = useState<string | null>(null);
  const limit = 1000;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [status, setStatus] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedSearchTerm(value);
  }, 1000);

  useEffect(() => {
    setLoading((l) => !l);
    setInvoices(orders);
    setLoading((l) => !l);
  }, [orders]);

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

  const handleCopy = async () => {
    setLoading((l) => !l);
    const newInvoices: Sheets_Invoice[] = await fetchOrders(start, limit);
    setInvoices(newInvoices);
    setLoading((l) => !l);
  };

  const updateInvoice = (updatedInvoice: Sheets_Invoice) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.order_id === updatedInvoice.order_id ? updatedInvoice : invoice
      )
    );
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchedInvoices = invoices.filter((invoice) => {
    const search = debouncedSearchTerm.toLowerCase();
    return Object.values(invoice)
      .filter((val) => typeof val === "string" || typeof val === "number")
      .some((val) => val?.toString().toLowerCase().includes(search));
  });

  return (
    <div className="overflow-x-auto sm:p-4">
      <Search search={searchTerm} onSearch={handleSearch} />
      {loading ? (
        <Loading />
      ) : (
        <ReturnOrders
          onSetStatus={setStatus}
          onSetTitle={setTitle}
          onOpenModal={setOpenModalIndex}
          modalIndex={openModalIndex}
          orders={searchedInvoices}
        />
      )}
      <ErrorBoundary fallback={<ErrorModal />}>
        {openModalIndex !== null && (
          <EditModal
            title={title}
            handleCopy={handleCopy}
            invoice={
              searchedInvoices.find(
                (invoice) => invoice.order_id === openModalIndex
              ) as Sheets_Invoice
            }
            setOpenModalIndex={setOpenModalIndex}
            index={openModalIndex}
            updateInvoice={updateInvoice}
            status={status}
          />
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Orders;
