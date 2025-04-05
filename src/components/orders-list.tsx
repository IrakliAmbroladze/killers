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

  const loadMore = () => {
    setStart((prev) => prev + limit);
  };

  const updateInvoice = (updatedInvoice: Sheets_Invoice, index: number) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice, i) => (i === index ? updatedInvoice : invoice))
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
    <div>
      <Search search={searchTerm} onSearch={handleSearch} />
      <div className="grid grid-cols-1 2xl:grid-cols-4 gap-1.5 pt-2.5">
        {searchedInvoices.map((invoice, index) => (
          <li
            key={index}
            className="p-4 bg-white shadow-md rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold text-lg text-gray-800 "
          >
            <button
              onClick={() =>
                setOpenModalIndex(openModalIndex === index ? null : index)
              }
              className="border px-2.5 cursor-pointer hover:bg-gray-200 rounded-md"
            >
              edit
            </button>
            {openModalIndex === index && (
              <UpdateModal
                invoice={invoice}
                setOpenModalIndex={setOpenModalIndex}
                index={index}
                updateInvoice={updateInvoice}
              />
            )}
            <Cart invoice={invoice} />
          </li>
        ))}
      </div>

      {loading ? (
        <button className="my-10 hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out bg-gray-300 text-black py-3 px-20 rounded-lg cursor-pointer">
          Loading...
        </button>
      ) : (
        <button
          onClick={loadMore}
          className="my-10 hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out bg-gray-300 text-black py-3 px-20 rounded-lg cursor-pointer"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default OrdersList;
