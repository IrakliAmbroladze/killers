"use client";

import { Sheets_Invoice } from "@/types/invoices";
import React, { useEffect, useState } from "react";
import fetchOrders from "@/utils/server/fetch-orders";

const OrdersList = () => {
  const [invoices, setInvoices] = useState<Sheets_Invoice[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 8; // Load 100 records per request

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const newInvoices = await fetchOrders(start, limit);
      setInvoices((prev) => [...prev, ...newInvoices]);
      setLoading(false);
    };

    loadOrders();
  }, [start]);

  const loadMore = () => {
    setStart((prev) => prev + limit);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-1.5">
        {invoices.reverse().map((invoice, index) => (
          <li
            key={index}
            className="p-4 bg-white shadow-md rounded-xl border border-gray-200 hover:bg-gray-50 hover:cursor-pointer font-semibold text-lg text-gray-800 "
          >
            <div className="flex flex-col">
              <div>date: {invoice.date}</div>
              <div>customer: {invoice.customer}</div>
              <div>ID: {invoice.identity}</div>
              <div>phone: {invoice.phone}</div>
              <div>address: {invoice.address}</div>
              <div>provider: {invoice.provider}</div>
              <div>email: {invoice.email}</div>
              <div>payment: {invoice.payment}</div>
              <div>items: {invoice.items}</div>
              <div>total: {invoice.total}</div>
              <div>seller: {invoice.seller}</div>
              <div>delivery_date: {invoice.delivery_date}</div>
              <div>technician: {invoice.technician}</div>
            </div>
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
