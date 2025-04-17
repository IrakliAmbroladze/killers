"use client";

import { Sheets_Invoice } from "@/types/invoices";
import React, { ChangeEvent, useEffect, useState } from "react";
import UpdateModal from "@/components/update-modal";
import Cart from "@/components/cart";
import { loadOrders } from "@/utils/load-orders";
import Search from "@/components/search";
import { useDebouncedCallback } from "use-debounce";
import { FiCopy, FiEdit } from "react-icons/fi";
import fetchOrders from "@/utils/server/fetch-orders";
import { ErrorBoundary } from "react-error-boundary";
import ErrorModal from "@/components/error-modal";

const OrdersList = () => {
  const [invoices, setInvoices] = useState<Sheets_Invoice[]>([]);
  const start = 0;
  const [loading, setLoading] = useState(true);
  const [openModalIndex, setOpenModalIndex] = useState<string | null>(null);
  const limit = 1000;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [status, setStatus] = useState<string>("");
  const [title, setTitle] = useState("");

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

  useEffect(() => {
    loadOrders(setLoading, start, limit, setInvoices);
  }, [start]);

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
        <div className="mt-2.5 bg-gray-300 text-black py-3 px-20 rounded-lg text-center">
          loading ...
        </div>
      ) : (
        <table className="min-w-full table-auto border border-collapse mt-4">
          <thead>
            <tr className="bg-gray-200 dark:bg-stone-800 text-left text-sm font-bold">
              <th className="p-1">Edit</th>
              <th className="p-1">Copy</th>
              <th className="p-1">Date</th>
              <th className="p-1">Customer</th>
              <th className="p-1 hidden lg:table-cell">Identity</th>
              <th className="p-1 ">Address</th>
              <th className="p-1 hidden lg:table-cell">Items</th>
              <th className="p-1 hidden lg:table-cell">Provider</th>
              <th className="p-1 hidden lg:table-cell">Seller</th>
              <th className="p-1 hidden lg:table-cell">Delivery Date</th>
              <th className="p-1">Tech.</th>
              <th className="p-1">Doc.</th>
            </tr>
          </thead>
          <tbody>
            {searchedInvoices.map((invoice) => (
              <tr
                key={invoice.order_id}
                className="border-b dark:border-stone-700 hover:bg-gray-100 dark:hover:bg-stone-900"
              >
                <td
                  onClick={() => {
                    if (invoice.order_id) {
                      setOpenModalIndex(
                        openModalIndex === invoice.order_id
                          ? null
                          : invoice.order_id
                      );
                      setStatus("update");
                      setTitle("Edit Order");
                    }
                  }}
                  className="p-2 cursor-pointer text-blue-600 hover:underline"
                >
                  <FiEdit />
                </td>
                <td
                  onClick={() => {
                    if (invoice.order_id) {
                      setOpenModalIndex(
                        openModalIndex === invoice.order_id
                          ? null
                          : invoice.order_id
                      );
                      setStatus("add");
                      setTitle("Copy Order");
                    }
                  }}
                  className="p-2 cursor-pointer text-blue-600 hover:underline"
                >
                  <FiCopy />
                </td>
                <Cart invoice={invoice} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ErrorBoundary fallback={<ErrorModal />}>
        {openModalIndex !== null && (
          <UpdateModal
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

export default OrdersList;
