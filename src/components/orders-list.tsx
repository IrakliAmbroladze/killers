"use client";

import { Sheets_Invoice } from "@/types/invoices";
import React, { ChangeEvent, useEffect, useState } from "react";
import UpdateModal from "@/components/update-modal";
import Cart from "@/components/cart";
import { loadOrders } from "@/utils/load-orders";
import Search from "@/components/search";
import { useDebouncedCallback } from "use-debounce";

const OrdersList = () => {
  const [invoices, setInvoices] = useState<Sheets_Invoice[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const limit = 20000;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

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

  const loadMore = () => setStart((prev) => prev + limit);

  const updateInvoice = (updatedInvoice: Sheets_Invoice, index: number) => {
    setInvoices((prev) =>
      prev.map((inv, i) => (i === index ? updatedInvoice : inv))
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
    <div className="overflow-x-auto p-4">
      <Search search={searchTerm} onSearch={handleSearch} />
      <table className="min-w-full table-auto border border-collapse mt-4">
        <thead>
          <tr className="bg-gray-200 dark:bg-stone-800 text-left text-sm font-bold">
            <th className="p-2">Details</th>
            <th className="p-2">Date</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Identity</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Items</th>
            <th className="p-2">Seller</th>
            <th className="p-2">Delivery Date</th>
            <th className="p-2">Tech.</th>
            <th className="p-2">Doc.</th>
          </tr>
        </thead>
        <tbody>
          {searchedInvoices.map((invoice, index) => (
            <tr
              key={index}
              className="border-b dark:border-stone-700 hover:bg-gray-100 dark:hover:bg-stone-900"
            >
              <td
                onClick={() =>
                  setOpenModalIndex(openModalIndex === index ? null : index)
                }
                className="p-2 cursor-pointer text-blue-600 hover:underline"
              >
                View
              </td>
              <Cart invoice={invoice} />
            </tr>
          ))}
        </tbody>
      </table>

      {openModalIndex !== null && (
        <UpdateModal
          invoice={searchedInvoices[openModalIndex]}
          setOpenModalIndex={setOpenModalIndex}
          index={openModalIndex}
          updateInvoice={updateInvoice}
        />
      )}

      <div className="flex justify-center">
        <button
          onClick={loadMore}
          className="my-10 hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out bg-gray-300 text-black py-3 px-20 rounded-lg cursor-pointer"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default OrdersList;
